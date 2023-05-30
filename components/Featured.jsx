import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Featured() {

    async function GetCart() {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
            console.log(cart);
        }
    }
    
    async function HandleAddToCart(pizzaId, pizzaName, pizzaPrice) {
        const cart = await AsyncStorage.getItem('cart');
        console.log(cart)
        if (cart) {
            await AsyncStorage.setItem('cart', JSON.stringify([...JSON.parse(cart), {id: pizzaId, name: pizzaName, price: pizzaPrice}]));
        } else {
            await AsyncStorage.setItem('cart', JSON.stringify([{id: pizzaId, name: pizzaName, price: pizzaPrice}]));
        }
    }

    return (
        <>
            <View style={styles.featuredCard}>
                <Image source={require('../assets/images/placeholder.jpg')} style={styles.featuredImage}/>
                <Text style={styles.featuredHeaderText}>Very cool pizza</Text>
                <Text style={styles.featuredSubText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus vitae felis at nisl dictum aliquam. Sed eget lacus at eros lacinia lacinia. Sed ewdawde</Text>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable onPress={(e) => HandleAddToCart(1, 'Very cool pizza', 20)} style={styles.featuredButton}>
                        <Text style={{color: 'white', fontSize: 18}}>Add to cart</Text>
                    </Pressable>
                </View>
                {/* <Button style={styles.featuredButton} title="Add to cart" color="#001be7" /> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    featuredCard: {
        width: '85%',
        height: '50%',
        maxHeight: 450,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    featuredImage: {
        width: '100%',
        height: '50%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    featuredHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
    },
    featuredSubText: {
        fontSize: 16,
        color: 'grey',
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    featuredButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001be7',
        width: '80%',
        height: '25%',
        maxHeight: 50,
        borderRadius: 15,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    }
})