import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput, ScrollView } from 'react-native';
import Featured from './components/Featured'
import ItemList from './components/itemList';

export default function App() {
  return (
    <>
      <ScrollView>
        <Featured />
        <ItemList />
      </ScrollView>
    </>
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