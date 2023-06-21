import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Featured from '../components/Featured'
import ItemList from '../components/itemList';
import Navbar from '../components/navBar';
import supabase from '../utils/supabase.js';

export default function HomePage({navigation, route}) {

  async function GetSession() {
    // await supabase.auth.signOut()
    const { data, error } = await supabase.auth.getSession();
    if (!data?.session?.user) {
      return navigation.navigate('Login');
    }
  }

  async function Logout() {
    await supabase.auth.signOut()
    navigation.navigate('Login')
  }

  React.useEffect(() => {
    GetSession()
  })

  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      <Button title='hi' onPress={() => navigation.navigate('AddPizza')}></Button>
      <Button title='lol' onPress={() => Logout()}></Button>
      <Featured />
      <ItemList />
    </ScrollView>
  );
}