import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { decode } from 'base64-arraybuffer'
import supabase from "../../utils/supabase.js"
import Navbar from '../../components/navBar.jsx';

export default function DeleteOrderPage({route, navigation}) {
    
    async function deleteItem() {
        const deleteItem = await supabase.from("orders").delete().eq("id", route.params.id)
        if (deleteItem.error) {
            Alert.alert("Error", error.message)
        }
        navigation.navigate("Orders");
    }

    React.useEffect(() => {
        deleteItem();
    }, [])

}
