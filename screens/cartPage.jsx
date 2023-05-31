import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartPage() {
    async function GetCart() {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            console.log(cart);
        }
    }

    async function UpdateItem(itemId, newQuantity) {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            const cartArray = JSON.parse(cart);
            const itemIndex = cartArray.findIndex(i => i === itemId);
            cartArray[itemIndex].quantity = newQuantity;
            await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
            GetCart();
        }
    }

    async function DeleteItem(itemId) {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            const cartArray = JSON.parse(cart);
            const newCartArray = cartArray.filter(i => i !== itemId);
            await AsyncStorage.setItem('cart', JSON.stringify(newCartArray));
            GetCart();
        }
    }
    
    async function ClearCart() {
        await AsyncStorage.removeItem('cart');
        GetCart();
    }

    return (
        <View>

        </View>
  );
}

const styles = StyleSheet.create({
});