import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SpecialPage( {route, navigation }) {
    const [ingredients, setIngredients] = useState([]);
    const [chosenIngredients, setChosenIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
  
    function handleChooseIngredient(ingredient) {
      if (chosenIngredients.includes(ingredient)) {
        setChosenIngredients(chosenIngredients.filter(i => i !== ingredient));
      } else {
        setChosenIngredients([...chosenIngredients, ingredient]);
      }
    }
  
    async function getPizzaData() {
      setIngredients(["Puur zuiver bloem 1 gram", "Italiaanse kruiden 5 gram", "Parmesan 5 gram", "Mozzarella 5 gram", "Olijven 5 gram", "Peperoni 5 gram", "Mozzarella saus 5 gram", "BBQ saus 5 gram", "Pastasaus bezorging"]);
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
      HandleAddToCart(999, "Custom", 50, "none", chosenIngredients);
    }
  
    React.useEffect(() => {
      getPizzaData()
    }, [])
  
    return (
      <View style={styles.container}>
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