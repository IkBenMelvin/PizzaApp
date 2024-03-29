import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomePage, LoginPage, RegisterPage, LogoutPage, CartScreen, PizzaAdjust, UserOrders, UploadPage, ProductPage, OrderPage, UserPage, PizzaList, EditPizzaPage, DeletePizzaPage, EditOrderPage, DeleteOrderPage, SpecialPage, Dashboard } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        { /* Main section*/ }
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Logout" component={LogoutPage} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="PizzaDetails" component={PizzaAdjust} />
        <Stack.Screen name="RecentOrders" component={UserOrders} />
        <Stack.Screen name="SpecialPage" component={SpecialPage} />
        { /* Admin section*/ }
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddPizza" component={UploadPage} />
        <Stack.Screen name="editPizza" component={EditPizzaPage} />
        <Stack.Screen name="deletePizza" component={DeletePizzaPage} />
        <Stack.Screen name="editOrder" component={EditOrderPage} />
        <Stack.Screen name="deleteOrder" component={DeleteOrderPage} />
        <Stack.Screen name="Products" component={ProductPage} />
        <Stack.Screen name="Orders" component={OrderPage} />
        <Stack.Screen name="Users" component={UserPage} />
        <Stack.Screen name="Pizzalist" component={PizzaList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}