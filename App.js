import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Featured from './components/Featured'
import ItemList from './components/itemList';

export default function App() {
  return (
    <>
      <Featured />
      <ItemList />
    </>
    // <View style={styles.container}>
    //   <Text style={{color: '#fff', fontSize:30}}>Hello Fam</Text>
    //   <StatusBar style="auto" />
    // </View>
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