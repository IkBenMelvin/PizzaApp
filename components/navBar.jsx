import React, {useState, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Image, ScrollView, Animated } from 'react-native';
import { Link } from '@react-navigation/native';
import supabase from '../utils/supabase';

const Navbar = ({ navigation }) => {
  const NavLinks = ["Home", "Register", "Login", "Cart","Profile", "Logout"];
  const AdminLinks = ["Home", "Dashboard", "AddPizza", "Products", "Orders", "Users", "Profile", "Logout"];
  const [expanded, setExpanded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const heightAnimation = useRef(new Animated.Value(0)).current;

  async function checkAdmin() {
    const userID = (await supabase.auth.getSession()).data.session.user.id
    const { data, error } = await supabase.from("users").select("isAdmin").eq("id", userID);
    if (data[0].isAdmin) {
      setIsAdmin(true)
    }
  }

  const toggleHeight = () => {
    const newHeight = expanded ? 0 : 180;
    Animated.timing(heightAnimation, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false, // Required for 'layout' animation
    }).start();
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    checkAdmin();
  }, []) 

  return (
    <View style={styles.Link}>
      <Animated.View style={[styles.LinkContainer, {width: heightAnimation}]}>
        {isAdmin ? AdminLinks.map((link) => {
          return (
            <Pressable key={link} onPress={() => {navigation.navigate(link);
            toggleHeight;}}>
              <Text numberOfLines={1} style={styles.text}>{link}</Text>
            </Pressable>
          );
        }) : NavLinks.map((link) => {
          return (
            <Pressable key={link} onPress={() => {navigation.navigate(link);
              toggleHeight;}}>           
                 <Text numberOfLines={1} style={styles.adminText}>{link}</Text>
            </Pressable>
          );
        })}
      </Animated.View>

      <Pressable onPress={toggleHeight} style={styles.imageButton}>
        <Image style={styles.image} source={require('../assets/menu.png')} />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  Link: {
    flexDirection: 'row',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  LinkContainer: {
    backgroundColor: '#1B262C',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 25,
    Left:0,
    height: '100%',
    color: 'white',
  },
  text: {
    marginTop:10,
    marginLeft:10,
    fontSize:30,
    backgroundColor: '#1B262C',
    color: '#3282B8',
  },
  adminText: {
    marginTop:10,
    marginLeft:10,
    fontSize:30,
    backgroundColor: '#1B262C',
    color: '#0F4C75',
  },
  imageButton: {
  height:50,
  },
  image: {
    backgroundColor: '#3282B8',
    tintColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // elevation: 24,
    marginTop: 35,
    marginLeft: 20,
    height:50,
    width: 50,
  },
});

export default Navbar;