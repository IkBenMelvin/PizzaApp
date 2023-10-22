import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import supabase from '../utils/supabase';

export default function RegisterPage({ navigation }) {
  // TODO: Clean this up and change it
  // const [information, setInformation] = useState({"email": "", "name": "", });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  async function handleSignUp() {
    if (password !== confirmPassword) {
      setError("Password and confirm password are not the same.")
    } else {
      if (password.length <= 7) {
        setError("Password must be 8 characters.")
      } else {
        let currentUser;
        await supabase.auth.signUp({
          email: email,
          password: password,
        }).then((data) => {
          if (data.error) {
            console.log(data.error)
          }
          currentUser = data.data.user.id;
        });
        let newphoneNumber = phoneNumber;
        if (phoneNumber.includes(" ")) {
          newphoneNumber = phoneNumber.replaceAll(" ", "");
        }
        if (newphoneNumber.includes("-")) {
          newphoneNumber = newphoneNumber.replaceAll("-", "");
        }
        const item = await supabase.from('users').insert({
          id: currentUser,
          name: name,
          email: email,
          street: street,
          postal: postalCode,
          isAdmin: false,
          number: parseInt(newphoneNumber),
        });
        if (item.error) {
          Alert.alert("Error", item.error.message);
        }
        setError("")
        navigation.navigate("Home");
      }
    }
  }

  
  async function getSession() {
    const { data, error} = await supabase.auth.getSession();
    if (data.session) {
      navigation.navigate("Home")
    }
  }

  React.useEffect(() => {
    getSession();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Registration Form</Text>
      <Text style={styles.errorText}>{error}</Text>

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
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
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

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Login")}>
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
    marginBottom: 10,
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
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
};