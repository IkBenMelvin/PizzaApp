import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable } from 'react-native';

export default function ItemList() {
    const [pizzas, setPizzas] = React.useState([{id: 1, name: "Margerita", ingredients: [], price: 20, img: "placeholder.jpg"},]);
    return (
    <View>
      <Text style={styles.allItemsText}>Choose from all pizzas:</Text>
        <View style={styles.pizzaContainer}>
            {pizzas.map(pizza => 
                <View key={pizza.id} style={styles.pizzaCard}>
                    <Image source={require(`../assets/images/placeholder.jpg`)} style={styles.pizzaImage}></Image>
                    <Text>{pizza.name}</Text>
                    <View style={styles.pizzaIngredients}>
                    </View>
                    <Text>{pizza.price}</Text>
                </View>
            )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    allItemsText: {
        marginTop: 20,
        marginLeft: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    pizzaContainer: {
        flex: 2,
        width: '100%',
        height: '100%',
    },
    pizzaCard: {
        // width: '30%',
        // height: '15%',
        width: '45%',
        height: '60%',
        backgroundColor: '#ddd'
    },
    pizzaImage: {
        width: '100%',
        height: '75%',

    }
});