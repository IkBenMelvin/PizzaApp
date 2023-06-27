import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../utils/supabase';

export default function Featured( {navigation} ) {
    const [featuredPizza, setFeaturedPizza] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const baseURL = "https://xbxjnbuwdqtdstrkqcpa.supabase.co/storage/v1/object/public/images/";
    
    async function getRandomPizza() {
        const {data, error} = await supabase.from("pizzas").select("*");
        const random = Math.floor(Math.random() * data.length - 1);
        const pizza = data[random];
        setFeaturedPizza(pizza);
        setLoading(false);
    }

    function handleLink(id, name, price, ingredients) {
        navigation.navigate('PizzaDetails', {id: id, name: name, price: price, ingredients: ingredients})
    }

    React.useEffect(() => {
        getRandomPizza();
    }, [])

    function ReturnFeatured() {
        if (!loading) {   
            return (
                <>
                    <View style={styles.featuredCard}>
                        <Image source={{uri: `${baseURL}${featuredPizza.id}`}} style={styles.featuredImage}/>
                        <Text style={styles.featuredHeaderText}>{featuredPizza.name}</Text>
                        <Text style={styles.featuredSubText}>{featuredPizza.ingredients.join(", ")}</Text>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Pressable onPress={(e) => handleLink(featuredPizza.id, featuredPizza.name, featuredPizza.price, featuredPizza.ingredients)} style={styles.featuredButton}>
                                <Text style={{color: 'white', fontSize: 18}}>Add to cart</Text>
                            </Pressable>
                        </View>
                    </View>
                </>
            )
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }

    return (
        <>
            <ReturnFeatured />
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
        height: '60%',
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