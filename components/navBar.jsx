import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import { Link } from '@react-navigation/native';

const Navbar = ( {navigation} ) => {
  const NavLinks = ["Home", "Register", "Login", "Cart"];

  return (
    <View style={styles.LinkContainer}>
      {NavLinks.map((Link) => {
        return (
          <Pressable key={Link} onPress={() => navigation.navigate(Link)}>
            <Text>{Link}</Text>
          </Pressable>
        )
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  LinkContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  text: {
    fontSize: 16,
  },
});

export default Navbar;