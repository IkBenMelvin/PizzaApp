import React from 'react';
import { Alert } from 'react-native';
import supabase from "../../utils/supabase.js"

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
