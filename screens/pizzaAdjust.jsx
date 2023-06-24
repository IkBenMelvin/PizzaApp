import React, { useState } from 'react';
import { CheckBox, Button, Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import supabase from '../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PizzaAdjust = ( {route, navigation }) => {
  const [ingredients, setIngredients] = useState([]);
  const [chosenIngredients, setChosenIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const sizes = [{id: 0, style: '25cm'}, {id: 1, style: '35 cm'}, {id: 2, style: 'calzone'}];
  const [selectedSize, setSelectedSize] = useState(0);

  function handleChooseIngredient(ingredient) {
    if (chosenIngredients.includes(ingredient)) {
      setChosenIngredients(chosenIngredients.filter(i => i !== ingredient));
    } else {
      setChosenIngredients([...chosenIngredients, ingredient]);
    }
  }

  async function getPizzaData() {
    const { data, error } = await supabase.from("pizzas").select("*").eq("id", route.params.id);
    setIngredients(data[0].ingredients);
    setChosenIngredients(data[0].ingredients);
    setLoading(false);
  }

  async function HandleAddToCart(pizzaId, pizzaName, pizzaPrice, size, ingredients) {
    const cart = await AsyncStorage.getItem('cart');
    if (cart) {
        const newCart = JSON.parse(cart);
        let found;
        newCart.forEach((item, idx) => {
            if (item.id == pizzaId && item.size == size && item.ingredients == ingredients) {
                newCart[idx].quantity += 1;
                found = true;
            }
        })
        if (!found) {
            await AsyncStorage.setItem('cart', JSON.stringify([...JSON.parse(cart), {id: pizzaId, name: pizzaName, price: pizzaPrice, quantity: 1, size: size, ingredients: ingredients}]));
        } else {
            await AsyncStorage.setItem('cart', JSON.stringify(newCart));
        }
    } else {
        await AsyncStorage.setItem('cart', JSON.stringify([{id: pizzaId, name: pizzaName, price: pizzaPrice, quantity: 1, size: size, ingredients: ingredients}]));
    }
    navigation.navigate('Cart');
}

  async function handleAdd() {
    const chosenSize = sizes.find(size => size.id === selectedSize).style
    HandleAddToCart(route.params.id, route.params.name, route.params.price, chosenSize, chosenIngredients);
  }

  React.useEffect(() => {
    getPizzaData()
  }, [])

  return (
    <View style={styles.container}>
      <Button
        title="medium (25 cm)"
        buttonStyle={styles.sizeButton}
        onPress={() => setSelectedSize(0)}
      />

      <Button
        title="large (35 cm)"
        buttonStyle={styles.sizeButton}
        onPress={() => setSelectedSize(1)}
      />
      <Button
        title="calzone"
        buttonStyle={styles.sizeButton}
        onPress={() => setSelectedSize(2)}
      />
      {loading ? <Text>Loading...</Text> : ingredients.map((ingredient) => <CheckBox title={ingredient} key={ingredient} checked={chosenIngredients.includes(ingredient)} onPress={() => handleChooseIngredient(ingredient)}  />)}
      <Button
        title="Add to cart"
        buttonStyle={styles.confirmButton}
        onPress={() => handleAdd()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButton: {
    marginTop:15,
    width: 150,
    marginBottom: 5,
    backgroundColor: '#3282B8',
    borderRadius: 8,
  },

  confirmButton: {
  marginTop:10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 8,
  },
  selectedSizeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default PizzaAdjust;