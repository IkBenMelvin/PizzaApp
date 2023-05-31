import React from 'react';
import {StyleSheet, TextInput, View, Pressable, onPressFunction, Text} from 'react-native';

const Login = () => {
  const [text, onChangeText] = React.useState('Email');
  const [number, onChangeNumber] = React.useState('');

  return (
    <View style= {styles.View}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="password"
        keyboardType="numeric"
      />
      <Pressable style={styles.Pressable} onPress={onPressFunction}>
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

export default Login;