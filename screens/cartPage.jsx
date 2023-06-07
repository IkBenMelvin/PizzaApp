import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CartItems({cartItems}) {
    {cartItems.map(item => {
        return (
            <Text>hi</Text>
        )
    })}
}

export default function CartPage() {
    const [cartItems, setCartItems] = React.useState([{id: 1, name:"Very cool pizza", price: 20, quantity: 71}, {id: 2, name:"Test pizza, price: 50", quantity: 5}]);
    const [loading, setLoading] = React.useState(true);

    async function GetCart() {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            setCartItems(JSON.parse(cart));
            console.log(JSON.parse(cart))
            setLoading(false);
        }
    }

    async function UpdateItem(itemId, newQuantity) {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            const cartArray = JSON.parse(cart);
            const itemIndex = cartArray.findIndex(i => i === itemId);
            cartArray[itemIndex].quantity = newQuantity;
            await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
            // GetCart();
        }
    }

    async function DeleteItem(itemId) {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            const cartArray = JSON.parse(cart);
            const newCartArray = cartArray.filter(i => i !== itemId);
            await AsyncStorage.setItem('cart', JSON.stringify(newCartArray));
            // GetCart();
        }
    }
    
    async function ClearCart() {
        await AsyncStorage.removeItem('cart');
        // GetCart();
    }

    React.useEffect(() => {
        GetCart();
    }, [])

    return (
        <View style={{marginTop: 50}}>
        </View>
  );
}

const styles = StyleSheet.create({
});