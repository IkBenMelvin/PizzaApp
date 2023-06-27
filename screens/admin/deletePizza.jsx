import React from 'react';
import { Alert } from 'react-native';
import supabase from "../../utils/supabase.js"

export default function DeletePizzaPage({route, navigation}) {
    
    async function deleteItem() {
        const deleteItem = await supabase.from("pizzas").delete().eq("id", route.params.id)
        if (deleteItem.error) {
            Alert.alert("Error", "error.message")
        }
        const {data, error} = await supabase.storage.from("images").remove([`${route.params.id}`])
        navigation.navigate("Products", {refresh: true});
    }

    React.useEffect(() => {
        deleteItem();
    }, [])

}
