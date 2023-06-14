import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartPage() {
    const [cartItems, setCartItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    async function GetCart() {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            setCartItems(JSON.parse(cart));
            setLoading(false);
        }
    }

    async function UpdateItem(itemId, newQuantity) {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            const cartArray = JSON.parse(cart);
            if (newQuantity <= 0) {
                cartArray.map((cartItem, idx) => {
                    if (cartItem.id === itemId) {
                        cartArray.splice(idx, 1);
                    }
                })
                setCartItems(cartArray);
                await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
            } else {
                cartArray.map((cartItem, idx) => {
                    if (cartItem.id === itemId) {
                        cartArray[idx].quantity = newQuantity;
                    }
                })
                setCartItems(cartArray);
                await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
            }
        }
        //     const itemIndex = cartArray.findIndex(i => i === itemId);
        //     cartArray[itemIndex].quantity = newQuantity;
        //     await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
        //     // GetCart();
        // }
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
        <View style={styles.mainContainer}>
            <Text>Cart</Text>
            {loading ? <Text>Loading...</Text> : (cartItems.map((item) => (
            <View style={styles.cartItemContainer} key={item.id}>
                <Text style={styles.cartItem}>Name: {item.name}</Text>
                <Text style={styles.cartItem}>Quantity: {item.quantity}</Text>
                <Text style={styles.cartItem}>Price: {item.price * item.quantity}</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.addButton} onPress={() => UpdateItem(item.id, item.quantity + 1)}><Text>Add</Text></Pressable>
                    <Pressable style={styles.removeButton} onPress={() => UpdateItem(item.id, item.quantity - 1)}><Text>Remove</Text></Pressable>
                </View>
            </View>)))}
        </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
    },

    cartItemContainer: {
        margin: 5,
        width: "80%",
        minHeight: 50,
        borderColor: "gray",
        borderRadius: 2,
        backgroundColor: "gray",
    },

    cartItem: {
        color: "#fff",
        margin: 5,
        marginLeft: 10,
        fontSize: 16,
    },

    buttonContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",

    },

    addButton: {
        backgroundColor: "green",
        margin: 10,
        textAlign: "center",
        padding: 5,
        borderRadius: 10,
        minWidth: "40%",
        textAlignVertical: "center",
        color: "#fff",
    },

    removeButton: {
        backgroundColor: "red",
        margin: 10,
        textAlign: "center",
        padding: 5,
        borderRadius: 10,
        minWidth: "40%",
        textAlignVertical: "center",
        color: "#fff",
    }
});