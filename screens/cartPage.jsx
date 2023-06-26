import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView, 
  TextInput, 
  Image, 
  Pressable
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from "../components/navBar";
import supabase from "../utils/supabase";

export default function CartPage( {navigation} ) {
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [totalPrice, setTotalPrice] = React.useState(0);

  function applyDiscount(products) {
    let cheapestPrice = products[0].price;
    let cheapestIndex = 0;

    for (let i = 1; i < products.length; i++) {
      if (products[i].price < cheapestPrice) {
        cheapestPrice = products[i].price;
        cheapestIndex = i;
      }
    }

    // Subtract 1 from the quantity of the cheapest item
    products[cheapestIndex].quantity--;

    // Calculate the total price
    let totalPrice = cheapestPrice;

    for (let i = 0; i < products.length; i++) {
      totalPrice += products[i].quantity * (products[i].price * 0.5);
    }
    return totalPrice
  }
  

  async function GetCart() {
      const cart = await AsyncStorage.getItem('cart');
      if (cart) {
          setCartItems(JSON.parse(cart));
          JSON.parse(cart).map((item) => {
            item.ingredients.map((ingredient) => {
              if (ingredient.trim().toLowerCase().includes("pepperoni") && item.quantity >= 10) {
                navigation.navigate("SpecialPage")
              }
            })
          })
          const discounted = applyDiscount(JSON.parse(cart));
          setTotalPrice(discounted);
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
              JSON.parse(cart).map((item) => {
                item.ingredients.map((ingredient) => {
                  if (ingredient.trim().toLowerCase().includes("pepperoni") && item.quantity >= 10) {
                    navigation.navigate("SpecialPage")
                  }
                })
              })
              const discounted = applyDiscount(JSON.parse(cart));
              setTotalPrice(discounted);
              await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
          } else {
              cartArray.map((cartItem, idx) => {
                  if (cartItem.id === itemId) {
                      cartArray[idx].quantity = newQuantity;
                  }
              })
              JSON.parse(cart).map((item) => {
                item.ingredients.map((ingredient) => {
                  if (ingredient.trim().toLowerCase().includes("pepperoni") && item.quantity >= 10) {
                    navigation.navigate("SpecialPage")
                  }
                })
              })
              const discounted = applyDiscount(JSON.parse(cart));
              setTotalPrice(discounted);
              await AsyncStorage.setItem('cart', JSON.stringify(cartArray));
          }
      }
      GetCart();
  }
  
  async function ClearCart() {
      setTotalPrice(0);
      await AsyncStorage.removeItem('cart');
      GetCart();
  }

  
  function confirmClear() {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to clear your cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Clear", onPress: () => ClearCart() }
      ]
      );
      
    }

async function handleOrder() {
  const session = await supabase.auth.getSession();
  const userId = session.data.session.user.id
  console.log(cartItems)
  const { data, error } = await supabase.from('orders').insert({userId: userId, pizzas: cartItems, total: totalPrice, progress: 0})
  if (error) {
    Alert.alert("Error", error.message);
  }
  // ClearCart();
}
  
React.useEffect(() => {
  GetCart();
}, [])
// Calculate the total price of all items

return (
  <>
    <Navbar navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>
    
      <ScrollView style={styles.itemContainer}>
        {loading ? <Text>Loading...</Text> : (cartItems.map((item, idx) => (
          <View key={idx} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemSubline}>
                Price: ${item.price.toFixed(2)}
              </Text>
              <Text style={styles.itemSubline}>
                Ingredients: {item.ingredients.join(", ")}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => UpdateItem(item.id, item.quantity - 1)}
              >
                <AntDesign name="minus" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => UpdateItem(item.id, item.quantity + 1)}
              >
                <AntDesign name="plus" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        )
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>

        <TouchableOpacity style={styles.clearButton} onPress={() => confirmClear()}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => handleOrder()}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  itemContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: "#000",
    fontSize: 16,
    marginBottom: 5,
  },
  itemSubline: {
    color: "#888",
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 5,
  },
  quantity: {
    color: "#000",
    fontSize: 16,
    marginHorizontal: 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "right",
  },
  clearButton: {
    backgroundColor: "#3282B8",
    paddingVertical: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#0F4C75",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});