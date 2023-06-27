import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import supabase from "../../utils/supabase";

export default function EditOrderPage( {route, navigation} ) {
    const [selectedValue, setSelectedValue] = React.useState('pending');
    const [loading, setLoading] = React.useState(true);

    async function getCurrentProgess() {
        const {data, error} = await supabase.from("orders").select("progress").eq("id", route.params.id);
        if (error) {
            Alert.alert("Error", error.message);
        }
        setSelectedValue(data[0].progress);
        setLoading(false);
    }

    async function handleUpdate() {
        const {data, error} = await supabase.from("orders").update({progress: selectedValue}).eq("id", route.params.id);
        if (error) {
            Alert.alert("Error", error.message);
        }
        navigation.navigate("Orders", {refresh: true});
    }

    React.useEffect(() => {
        getCurrentProgess();
    }, [])
    
    return (
        <>
        <View style={{marginTop: 50}}>
            <Picker
                selectedValue={loading ? "loading" : selectedValue}
                style={styles.dropdown}
                onValueChange={setSelectedValue}
            >
                <Picker.Item label="Pending" value="pending" />
                <Picker.Item label="In Progress" value="in progress" />
                <Picker.Item label="In Oven" value="in oven" />
                <Picker.Item label="Done" value="done" />
            </Picker>
        </View>
        <Pressable onPress={() => handleUpdate()} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Update progress</Text>
        </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropdown: {
      height: 50,
      width: 200,
      marginBottom: 20,
    },
    addButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    addButtonLabel: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });