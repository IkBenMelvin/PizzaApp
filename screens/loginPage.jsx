import React from 'react';
import {StyleSheet, TextInput, View, Pressable, Alert, Text} from 'react-native';
import supabase from "../utils/supabase"

export default function LoginPage({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    
    })
    if (error) {
      Alert.alert('Error', error.message)
    }
    {navigation.navigate("Home")}
  }
  return (
  <>

  <View style= {styles.Viewlogin} >
  <Text style= {styles.textLogin}>Login</Text>
  </View>

    <View style= {styles.View}>
      <TextInput
        style={styles.allText}
        style={styles.input}
        placeholderTextColor='#FFF'
        onChangeText={onChangeEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={styles.allText,styles.input}
        placeholderTextColor='#FFF'
        secureTextEntry={true}
        onChangeText={onChangePassword}
        value={password}
        placeholder="password"
      />

    <View style={styles.buttonView}>

      <Pressable style={styles.PressableRegister}>
        <Text style={styles.allText, styles.PressableRegisterText} >Registreer{"\n"}{"\n"}</Text>
      </Pressable>


      <Pressable style={styles.PressableLogin} onPress={handleLogin}>
        <Text style={styles.PressableLoginText}>Login</Text>
      </Pressable>

    </View>

      <Pressable style={styles.PressableGuest} onPress={handleLogin}>
        <Text style={styles.PressableGuestText}>Continue as guest</Text>
       </Pressable>

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "white",
    color: "white",
    height: 40,
    width: 300,
    margin: 12,
    marginLeft:30,
    borderWidth: 1,
    padding: 10,

  },

  Pressable:{
    marginLeft: 150,
  },

  allText: {
  color: "white",
  },

  buttonView: {
  marginTop: 20,
  Flex: 1,
  flexDirection: "row",
  },

  PressableRegisterText: {
    marginLeft: 20,
    marginTop: 15,
    color: "white",
  },

  PressableRegister: {
    borderRadius:7,
    width: 100,
    height:50,
    marginLeft: 40,
    backgroundColor: "#0F4C75",
  },

  PressableLogin:{
  borderRadius:7,
  width: 100,
  height:50,
  marginLeft: 80,
  backgroundColor: "#0F4C75",
  },

  PressableLoginText:{
  marginLeft: 30,
  marginTop: 15,
  color: "white",
  },

  PressableGuest: {
    borderRadius:7,
    width: 140,
    height: 50,
    marginTop:20,
    marginLeft: 110,
    backgroundColor: "#0F4C75",
  },

    PressableGuestText:{
    marginLeft: 15,
    marginTop: 15,
    color: "white",
    },

  View: {
    marginTop: 50,
    marginLeft: 30,
    paddingTop:20,
    paddingBottom:19,
    backgroundColor: "#1B262C",
    borderRadius: 20,
    width: 350,
  },

  Viewlogin: {
    marginTop: 150,
    marginLeft: 30,
    paddingTop:20,
    paddingBottom:19,
    backgroundColor: "#1B262C",
    borderRadius: 20,
    width: 350,
  },

  textLogin:{
  fontSize: 30,
  left: 140,
  color:"white",
  }
});