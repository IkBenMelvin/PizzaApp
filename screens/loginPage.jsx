import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import supabase from "../utils/supabase.js"

export default function Loginpage( { navigation} ) {
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

  async function getSession() {
    const { data, error} = await supabase.auth.getSession();
    if (data.session) {
      navigation.navigate("Home")
    }
  }

  React.useEffect(() => {
    getSession();
  })

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Carleone Calzone</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={onChangeEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#3282B8',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#3282B8',
    paddingVertical: 12,
    width: 250,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    marginTop: 20,
    // marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3282B8',
    textDecorationLine: 'underline',
  },
  registerButton: {
    paddingVertical: 12,
    width: 250,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3282B8',
  },
  registerButtonText: {
    color: '#3282B8',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});