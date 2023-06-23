import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import { decode } from 'base64-arraybuffer'
import supabase from "../../utils/supabase.js"
import Navbar from '../../components/navBar.jsx';

export default function AddPizzaAdmin({ navigation }) {
    const [name, setName] = React.useState("");
    const [ingredients, setIngredients] = React.useState("");
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

        await supabase.storage.from('images').upload(`${data[0].id}`, decode(fileb64), {
            contentType: 'image/png',
        });
        navigation.navigate("Home");
    }

    return (
        <>
            <Navbar navigation={navigation} />
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                <Text>Name</Text>
                <TextInput style={styles.pizzaInput} onChangeText={text => setName(text)}/>
                <Text>Ingredients (seperate using ,)</Text>
                <TextInput style={styles.pizzaInput} multiline={true} numberOfLines={4} onChangeText={text => setIngredients(text)}/>
                <Text>Price</Text>
                <TextInput style={styles.pizzaInput} onChangeText={text => setPrice(text)}/>
                <Pressable style={image.length > 0 ? styles.selectedButton : styles.submitButton} onPress={() => GetPizzaImage()}>
                    {image.length > 0 ? <Text style={{color: "white"}}>Change image</Text> : <Text style={{color: 'white'}}>Select image</Text>}
                </Pressable>
                <Pressable style={styles.submitButton} onPress={() => createPizza()}>
                    <Text style={{color: 'white'}}>Add pizza</Text>
                </Pressable>
            </View>
        </>
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