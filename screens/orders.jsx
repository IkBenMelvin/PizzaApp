import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const OrderPage = () => {
  const tableData = [
    {
      id: 3,
      user_id: "69",
      total_price: 1.1,
      pizzas: "P",
      progress: "d",
      created_at: "d",
    },
    {
      id: 4,
      user_id: "69",
      total_price: 1.1,
      pizzas: "P",
      progress: "d",
      created_at: "d",
    },
    {
      id: 5,
      user_id: "69",
      total_price: 1.1,
      pizzas: "P",
      progress: "d",
      created_at: "d",
    },
    {
      id: 6,
      user_id: "69",
      total_price: 1.1,
      pizzas: "P",
      progress: "d",
      created_at: "d",
    },
    {
      id: 7,
      user_id: "69",
      total_price: 1.1,
      pizzas: "P",
      progress: "l",
      created_at: "d",
    },
  ];

  const headers = ["ID", "user_id", "total_price", "pizzas",  "progress", "created_at"];

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
    return tableData.map((record) => (
      <View style={styles.tableRow} key={record.id}>
        <Text style={styles.rowText}>{record.id}</Text>
        <Text style={styles.rowText}>{record.user_id}</Text>
        <Text style={styles.rowText}>{record.total_price}</Text>
        <Text style={styles.rowText}>{record.pizzas}</Text>
        <Text style={styles.rowText}>{record.progress}</Text>
        <Text style={styles.rowText}>{record.created_at}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <ScrollView>
          {renderHeader()}
          {renderRows()}
        </ScrollView>
      </ScrollView>
    </View>
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