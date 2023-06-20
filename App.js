import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartPage from './screens/cartPage';
import HomePage from './screens/homePage';
import LoginPage from './screens/loginPage';
import RegisterPage from './screens/registerPage';
import AddPizzaAdmin from './screens/admin/addPizza';
import CartScreen from './screens/cart2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Cart" component={CartScreen} />
        { /* Admin section*/ }
        <Stack.Screen name="AddPizza" component={AddPizzaAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});