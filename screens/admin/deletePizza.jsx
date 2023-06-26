import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { decode } from 'base64-arraybuffer'
import supabase from "../../utils/supabase.js"
import Navbar from '../../components/navBar.jsx';

export default function DeletePizzaPage({route, navigation}) {
    
    async function deleteItem() {
        const deleteItem = await supabase.from("pizzas").delete().eq("id", route.params.id)
        if (deleteItem.error) {
            Alert.alert("Error", "error.message")
        }
        const {data, error} = await supabase.storage.from("images").remove([`${route.params.id}`])
        navigation.navigate("Products");
    }

    React.useEffect(() => {
        deleteItem();
    }, [])

}
