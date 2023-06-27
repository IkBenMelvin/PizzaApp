import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';
import supabase from '../utils/supabase';

export default function ItemList( {navigation} ) {
    const [pizzas, setPizzas] = React.useState([]);
    const baseURL = "https://xbxjnbuwdqtdstrkqcpa.supabase.co/storage/v1/object/public/images/";

    async function getAllPizzas() {
        const allPizzas = await supabase.from('pizzas').select('*');
        setPizzas(allPizzas.data);
    }

    function handleLink(id, name, price, ingredients) {
        navigation.navigate('PizzaDetails', {id: id, name: name, price: price, ingredients: ingredients})
    }

    function RenderPizzas() {
        getAllPizzas();
        return (
            <View>
            <Text style={styles.allItemsText}>Choose from all pizzas:</Text>
                <View style={styles.pizzaContainer}>
                    {pizzas.map(pizza =>
                        <View key={pizza.id} style={styles.pizzaCard}>
                            <Image source={{uri: `${baseURL}${pizza.id}`}} style={styles.pizzaImage}></Image>
                            <Text style={styles.pizzaHeader}>{pizza.name}</Text>
                            <View style={styles.pizzaIngredients}>
                            </View>
                            <Text style={styles.pizzaSubtext}>{pizza.price}</Text>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                            <Pressable onPress={(e) => handleLink(pizza.id, pizza.name, pizza.price, pizza.ingredients)} style={styles.pizzaButton}>
                                <Text style={{color: 'white', fontSize: 18}}>Add to cart</Text>
                            </Pressable>
                            </View>
                        </View>
                    )}
                </View>
            </View>
      );
    }

    return (
        <RenderPizzas />
    )

}

const styles = StyleSheet.create({
    allItemsText: {
        marginTop: 20,
        marginLeft: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    pizzaContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        minHeight: 400,
        maxHeight: 1000,
    },
    pizzaCard: {
        // width: '30%',
        // height: '15%',
        width: '40%',
        height: '60%',
        minHeight: 150,
        maxHeight: 250,
        backgroundColor: '#ddd',
        margin: 10,
        borderRadius: 10,
    },
    pizzaImage: {
        width: '100%',
        height: '50%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    pizzaHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    pizzaSubtext: {
        fontSize: 16,
        marginLeft: 5,
    },
    pizzaButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3282B8',
        width: '80%',
        height: '25%',
        maxHeight: 50,
        borderRadius: 15,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
    }
});