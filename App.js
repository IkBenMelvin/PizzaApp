import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Main screens
import HomePage from './screens/homePage';
import LoginPage from './screens/loginPage';
import RegisterPage from './screens/registerPage';
import LogoutPage from './screens/logoutPage';
import CartScreen from './screens/cartPage';
import PizzaAdjust from './screens/pizzaAdjust';
import UserOrders from './screens/userOrders';
// Admin
import UploadPage from './screens/admin/addPizza';
import ProductPage from './screens/admin/allProducts';
import OrderPage from './screens/admin/allOrders';
import UserPage from './screens/admin/allUsers';
import PizzaList from './screens/admin/pizzaList';
import EditPizzaPage from './screens/admin/editPizza';
import DeletePizzaPage from './screens/admin/deletePizza';
import EditOrderPage from './screens/admin/editOrder';
import DeleteOrderPage from './screens/admin/deleteOrder';
import SpecialPage from './screens/specialPage';
import Dashboard from './screens/admin/dashboard';

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