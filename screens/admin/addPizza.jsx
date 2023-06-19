import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import { decode } from 'base64-arraybuffer'
import supabase from "../../supabase.js"

export default function AddPizzaAdmin({ navigation }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [image, setImage] = React.useState("");

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
        // ! Fix deze shit
        const {data, error} = await supabase.from('pizzas').insert({
            name: name,
            description: description,
            price: price,
            ingredients: [],
            sizes: [25, 30, 35]
        }).select();
        const fileb64 = await FileSystem.readAsStringAsync(
            image,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
        );

        await supabase.storage.from('images').upload(`${data[0].id}.png`, decode(fileb64), {
            contentType: 'image/png',
        });
        Alert.alert("Pizza added!");
        // navigation.navigate("PizzaAdmin");
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
            <Text>Name</Text>
            <TextInput style={styles.pizzaInput} onChangeText={text => setName(text)}/>
            <Text>Description</Text>
            <TextInput style={styles.pizzaInput} multiline={true} numberOfLines={4} onChangeText={text => setDescription(text)}/>
            <Text>Price</Text>
            <TextInput style={styles.pizzaInput} onChangeText={text => setPrice(text)}/>
            <Pressable style={image.length > 0 ? styles.selectedButton : styles.submitButton} onPress={() => GetPizzaImage()}>
                {image.length > 0 ? <Text style={{color: "white"}}>Change image</Text> : <Text style={{color: 'white'}}>Select image</Text>}
            </Pressable>
            <Pressable style={styles.submitButton} onPress={() => createPizza()}>
                <Text style={{color: 'white'}}>Add pizza</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    pizzaInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: 10,
        width: '80%',
        height: 40,
    },
    submitButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        margin: 10,
        backgroundColor: '#3282B8',
        borderRadius: 5,
        width: '40%',
        maxHeight: 40
    }, 
    selectedButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        margin: 10,
        backgroundColor: '#0F4C75',
        borderRadius: 5,
        width: '40%',
        maxHeight: 40
    }
});