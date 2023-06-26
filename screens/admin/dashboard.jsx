import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Navbar from '../../components/navBar.jsx';

export default function Dashboard({ navigation }) {
    const buttons = [
        { title: 'All Users', route: 'Users' },
        { title: 'All Orders', route: 'Orders' },
        { title: 'All Pizzas', route: 'Products' },
        { title: 'Add Pizza', route: 'AddPizza' },
    ];

    return (
        <>
            <Navbar navigation={navigation} />

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Admin Dashboard</Text>
                </View>
                {buttons.map((button, index) => (
                    <Pressable
                        key={index}
                        style={styles.button}
                        onPress={() => navigation.navigate(button.route)}
                    >
                        <Text style={styles.buttonText}>{button.title}</Text>
                    </Pressable>
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop:130,
        borderRadius: 5,
        padding: 10,
        marginBottom: 40,

    },
    headerText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28,
    },
    container: {
        flex: 1,
        margin: 10,
    },
    button: {
        backgroundColor: '#3282B8',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
});