import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import supabase from '../utils/supabase';

const RegistrationForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  async function handleSignUp() {
    await supabase.auth.signUp({
      email: email,
      password: password,
    }).then(async (data) => {
      await supabase.from('users').insert({
        id: data.data.session.user.id,
        name: name,
        email: email,
        street: street,
        postal: postalCode,
        number: phoneNumber
      })
    navigation.navigate("Home")
    });
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
      <Text style={styles.logo}>Registration Form</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <TextInput
          style={styles.input}
          placeholder="Street"
          onChangeText={setStreet}
          value={street}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          onChangeText={setPostalCode}
          value={postalCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.ClientButtonText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
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
    borderWidth: 1,
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

  ClientButtonText: {
      color: '#3282B8',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  forgotPasswordButton: {
    marginBottom: 20,
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
};

export default RegistrationForm;