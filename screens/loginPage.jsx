import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text} from 'react-native';

export default function LoginPage({ navigation }) {
  const email = React.useRef();
  const [text, onChangeText] = React.useState('Email');
  const [number, onChangePassword] = React.useState('');

  async function handleLogin() {
    console.log(email.current.value)
    // const { data, error } = await supabase.auth.signIn({
    //   email: text,
    //   password: number,
    //   // remember_me: true,
    // })
    // if (error) {
    //   alert.alert(error.message)
    // }
    // {navigation.navigate("Home")}
  }

  return (
    <View style= {styles.View}>
      <TextInput
        style={styles.input}
        ref={email}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={onChangePassword}
        value={number}
        placeholder="password"
        keyboardType="numeric"
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