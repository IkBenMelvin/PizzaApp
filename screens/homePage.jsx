import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Featured from '../components/Featured'
import BonusScreen from '../components/bonusPage';
import ItemList from '../components/itemList';
import Navbar from '../components/navBar';
import FoldOut from '../components/foldOut'

export default function HomePage({navigation, route}) {
  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      <Featured />
      <BonusScreen />
      {/* <Button onPress={() => navigation.navigate('Login')}></Button> */}
      <ItemList />
    </ScrollView>
  );
}