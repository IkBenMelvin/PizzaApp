import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text} from 'react-native';
import supabase from "../supabase.js"

export default function LoginPage({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  async function handleLogin() {
    const { data , error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      Alert.alert('Error', error.message)
      return;
    }
    return navigation.navigate("Home")
  }

  return (
    <View style= {styles.View}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
      />
      <Pressable style={styles.Pressable} onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  Pressable:{
    marginLeft: 180,
  },

  View: {
    marginTop: 100,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor: "grey",
  }
});