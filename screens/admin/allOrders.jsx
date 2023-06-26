import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from "react-native";
import Navbar from "../../components/navBar";
import supabase from "../../utils/supabase";

const OrderPage = ( {navigation} ) => {
  const [data, setData] = React.useState();
  const [pizzas, setPizzas] = React.useState();
  const [users, setUsers] = React.useState();
  const [loading, setLoading] = React.useState(true);

  function formatTimestamp(timestamp) {
    const dt = new Date(timestamp);
  
    // Format the date component as "DD/MM/YY"
    const dateStr = dt.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit"
    });
  
    // Format the time component as desired, e.g., "HH:MM:SS"
    const timeStr = dt.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  
    // Combine the formatted date and time components
    const formattedStr = `${dateStr} ${timeStr}`;
  
    return formattedStr;
  }
  
  async function fetchData() {
    const orderData = await supabase.from("orders").select("*");
    const pizzaData = await supabase.from("pizzas").select("*");
    const userData = await supabase.from("users").select("*");
    setData(orderData.data);
    setPizzas(pizzaData.data);
    setUsers(userData.data);
    setLoading(false)
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  const headers = ["edit", "delete", "ID", "Name", "Street", "Postal", "progress", "pizzas",  "total", "created_at"];

  const renderHeader = () => {
    return (
      <View style={styles.tableRow}>
        {headers.map((header, index) => (
          <Text style={styles.headerText} key={index}>
            {header}
          </Text>
        ))}
      </View>
    );
  };

  const renderRows = () => {
    return data.map((record) => (
      <View style={styles.tableRow} key={record.id}>
        <Pressable onPress={() => navigation.navigate("editOrder", {id: record.id})}>
          <Text style={[styles.rowText, {color: "blue"}]}>Edit</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("deleteOrder", {id: record.id})}>
          <Text style={[styles.rowText, {color: "red"}]}>Delete</Text>
        </Pressable>
        <Text style={styles.rowText}>{record.id}</Text>
        <Text style={styles.rowText}>{users.map((user) => user.id === record.userId ? user.name : null)}</Text>
        <Text style={styles.rowText}>{users.map((user) => user.id === record.userId ? user.street : null)}</Text>
        <Text style={styles.rowText}>{users.map((user) => user.id === record.userId ? user.postal : null)}</Text>
        <Text style={styles.rowText}>{record.progress}</Text>
        <Pressable onPress={() => navigation.navigate("Pizzalist", {id: record.id})}>
          <Text style={[styles.rowText, {color: "blue"}]}>See all</Text>
        </Pressable>
        <Text style={styles.rowText}>{record.total}</Text>
        <Text style={styles.rowText}>{formatTimestamp(record.created_at)}</Text>
      </View>
    ));
  };

  return (
    <>
      {/* <Navbar navigation={navigation} /> */}
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <ScrollView>
            {renderHeader()}
            {loading ? <Text>Loading...</Text> : renderRows()}
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  headerText: {
  marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    width: 100,
    textAlign: "center",
  },
  tableRow: {
    paddingTop: 15,
    paddingBottom:15,
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rowText: {
    fontSize: 14,
    width: 100,
    textAlign: "center",
  },
});

export default OrderPage;