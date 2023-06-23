import React, {useState, useRef } from 'react';
import { Pressable, StyleSheet, Text, View, Image, ScrollView, Animated } from 'react-native';
import { Link } from '@react-navigation/native';

const Navbar = ({ navigation }) => {
  const NavLinks = ["Home", "Register", "Login", "Cart","Profile", "Logout"];
  const [expanded, setExpanded] = useState(false);
  const heightAnimation = useRef(new Animated.Value(0)).current;

  const toggleHeight = () => {
    const newHeight = expanded ? 0 : 180;
    Animated.timing(heightAnimation, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false, // Required for 'layout' animation
    }).start();
    setExpanded(!expanded);
  };

  return (
    <View style={styles.Link}>
      <Animated.View style={[styles.LinkContainer, {width: heightAnimation}]}>
        {NavLinks.map((link) => {
          return (
            <Pressable key={link} onPress={() => navigation.navigate(link)}>
              <Text numberOfLines={1} style={styles.text}>{link}</Text>
            </Pressable>
          );
        })}

      </Animated.View>

      <Pressable onPress={toggleHeight}>
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
    backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 25,
    height: '100%',
    color: 'white',
  },
  text: {
  marginTop:10,
  marginLeft:10,
  fontSize:30,

    backgroundColor: 'blue',
    color: 'white',
  },
  image: {
    backgroundColor: 'blue',
    tintColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    marginTop: 35,
    marginLeft: 20,
    height:51,
    width: 50,
  },
});

export default Navbar;