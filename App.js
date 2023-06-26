import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Main screens
import HomePage from './screens/homePage';
import LoginPage from './screens/loginPage';
import RegisterPage from './screens/registerPage';
import CartScreen from './screens/cartPage';
// Admin
import AddPizzaAdmin from './screens/admin/addPizza';
import LogoutPage from './screens/logoutPage';
import UploadPage from './screens/admin/upload';
import allUsers from './screens/admin/allUsers';
import Dashboard from './screens/admin/dashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Logout" component={LogoutPage} />
        <Stack.Screen name="Cart" component={CartScreen} />
        { /* Admin section*/ }
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddPizza" component={UploadPage} />
        <Stack.Screen name="Users" component={allUsers} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}