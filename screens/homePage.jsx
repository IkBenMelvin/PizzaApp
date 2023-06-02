import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, Image, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Featured from '../components/Featured'
import ItemList from '../components/itemList';
import Navbar from '../components/navBar';
import supabase from '../utils/supabase';

export default function HomePage({navigation, route}) {

  async function GetSession() {
    const { session } = await supabase.auth.getSession();
    console.log(session)
  }

  React.useEffect(() => {
    GetSession()
  })

  return (
    <ScrollView>
      <Navbar navigation={navigation} />
      <Featured />
      <Button title="get session" onPress={() => GetSession()}></Button>
      <ItemList />
    </ScrollView>
  );
}