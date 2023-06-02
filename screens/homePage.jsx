import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Featured from '../components/Featured'
import ItemList from '../components/itemList';
import Navbar from '../components/navBar';

export default function HomePage({navigation, route}) {
  return (
    <ScrollView>
      <Navbar />
      <Featured />
      {/* <Button onPress={() => navigation.navigate('Login')}></Button> */}
      <ItemList />
    </ScrollView>
  );
}