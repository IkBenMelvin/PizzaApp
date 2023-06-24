import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navbar from "../../components/navBar";

const ProductPage = ( {navigation} ) => {
  const tableData = [
    {
      id: 8,
      name: "69",
      price: 1.1,
      ingredients: "P",
      bonus: true,
      created_at: "d",
    },
    {
      id: 78,
      name: "69",
      price: 1.1,
      ingredients: "P",
      bonus: true,
      created_at: "d",
    },
    {
      id: 9,
      name: "69",
      price: 1.1,
      ingredients: "P",
      bonus: true,
      created_at: "d",
    },
    {
      id: 5,
      name: "69",
      price: 1.1,
      ingredients: "P",
      bonus: true,
      created_at: "d",
    },
    {
      id: 7,
      name: "69",
      price: 1.1,
      ingredients: "P",
      bonus: true,
      created_at: "d",
    },
  ];

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
    return tableData.map((record) => (
      <View style={styles.tableRow} key={record.id}>
        <Text style={styles.rowText}>{record.id}</Text>
        <Text style={styles.rowText}>{record.name}</Text>
        <Text style={styles.rowText}>{record.price}</Text>
        <Text style={styles.rowText}>{record.created_at}</Text>
        <Text style={styles.rowText}>{record.ingredients}</Text>
        <Text style={styles.rowText}>{record.bonus}</Text>
      </View>
    ));
  };

  return (
    <>
        <Navbar navigation={navigation} />
        <View style={styles.container}>
        <ScrollView horizontal={true}>
            <ScrollView>
            {renderHeader()}
            {renderRows()}
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