import React from 'react';
import {StyleSheet, TextInput, View, Alert, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import { decode } from 'base64-arraybuffer'
import supabase from "../../utils/supabase.js"
import Navbar from '../../components/navBar.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';

const UploadPage = ({navigation}) => {
    const [name, setName] = React.useState("");
    const [ingredients, setIngredients] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState(null);

    async function GetPizzaImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    async function createPizza() {
        const {data, error} = await supabase.from('pizzas').insert({
            name: name,
            price: price,
            ingredients: ingredients.split(","),
        }).select();
        const fileb64 = await FileSystem.readAsStringAsync(
            image,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
        );
        if (error) {
            Alert.alert("Error", error.message);
        }

        const upload = await supabase.storage.from('images').upload(`${data[0].id}`, decode(fileb64), {
            contentType: 'image/png',
        });
        if (upload?.error) {
            Alert.alert("Error", upload.error.message);
        }
        navigation.navigate("Home");
    }

  return (
    <>
        <Navbar navigation={navigation} />
        <View style={styles.container}>
        <Text style={styles.heading}>Upload Page</Text>

        <TouchableOpacity
            style={styles.fileUploadButton}
            onPress={() => GetPizzaImage()}
        >
            <Ionicons name="cloud-upload" size={24} color="#fff" />
            {image ? <Text style={styles.buttonText}>Change File</Text> : <Text style={styles.buttonText}>Choose File</Text>}
        </TouchableOpacity>

        <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
        />

        <TextInput
            style={styles.input}
            placeholder="Ingredients (seperate using ,)"
            value={ingredients}
            onChangeText={setIngredients}
        />

        <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={() => createPizza()}>
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3282B8",
    marginBottom: 20,
  },
  fileUploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3282B8",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  selectedFileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedFileText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#3282B8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#3282B8",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#3282B8",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default UploadPage;