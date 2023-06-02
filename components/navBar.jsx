import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Link } from '@react-navigation/native';

const Navbar = () => {
  const NavLinks = ["Home", "Register", "Login", "Cart"];

  return (
    <View style={styles.LinkContainer}>
      {NavLinks.map((Link) => {
        return (
          <Text key={Link}>{Link}</Text>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
  },
});

export default Navbar;