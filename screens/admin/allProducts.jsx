import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Navbar from "../../components/navBar";
import supabase from "../../utils/supabase";

const ProductPage = ( {navigation} ) => {
  const [pizzas, setPizzas] = React.useState();
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
    const pizzaData = await supabase.from("pizzas").select("*");
    setPizzas(pizzaData.data);
    setLoading(false)
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  const headers = ["ID", "name", "price", "ingredients",  "bonus", "created_at"];

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
    return pizzas.map((record) => (
      <View style={styles.tableRow} key={record.id}>
        <Pressable onPress={() => navigation.navigate("editPizza", {id: record.id})}>
          <Text style={[styles.rowText, {color: "blue"}]}>Edit</Text>
        </Pressable>
        <Text style={styles.rowText}>{record.id}</Text>
        <Text style={styles.rowText}>{record.name}</Text>
        <Text style={styles.rowText}>{record.price}</Text>
        <Text style={styles.rowText}>{record.ingredients.join(", ")}</Text>
        <Text style={styles.rowText}>{record.bonus ? "Yes" : "No"}</Text>
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

export default ProductPage;