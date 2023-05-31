import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartPage from './screens/cartPage';
import HomePage from './screens/homePage';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomePage} />
        {/* <Stack.Screen name="Login" component={} /> */}
        <Stack.Screen name="Cart" component={CartPage} />
      </Stack.Navigator>
    </NavigationContainer>
      // <ScrollView>
      //   <Featured />
      //   <ItemList />
      // </ScrollView>
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