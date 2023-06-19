import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import supabase from "../../supabase.js"

export default function AddPizzaAdmin({ navigation }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState("");

    async function GetPizzaImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
        if (!result.canceled) {
            console.log(result.assets[0].uri)

            const { data, error } = await supabase.storage.from('images').upload(result.assets[0].fileName, result.assets[0].uri);
            console.log(data, error);
        }
    }


    React.useEffect(() => {
        GetPizzaImage();
    })

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
            <TextInput onChangeText={text => setName(text)}/>
            <TextInput multiline={true} numberOfLines={4} onChangeText={text => setDescription(text)}/>
            <TextInput onChangeText={text => setPrice(text)}/>
        </View>
    )
};

const styles = StyleSheet.create({
});