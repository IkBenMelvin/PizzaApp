import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function PizzaList() {
  const tableData = [
    {
      name: "hawaii",
      size: "Job",
      ingredients: "perronopi, sanana, moorhsum",
    },
    {
      name: "hawaii",
      size: "Job",
      ingredients: "mah, sanana, moorhsum",
    },
    {
      name: "hawaii",
      size: "Job",
      ingredients: "perronopi, sanana, moorhsum",
    },
    {
      name: "hawaii",
      ingredients: "perronopi, sanana, moorhsum",
      size: 30,
    },
    {
      name: "test",
      size: 30,
      ingredients: "perronopi, sanana, moorhsum",
    },
  ];

  const renderRows = () => {
    return tableData.flatMap((record, index) => {
      const { maat, pizzas, ingredients } = record;

      return pizzas.map((pizza, pizzaIndex) => (
        <View style={styles.rowContainer} key={pizzaIndex}>
            <View style={styles.rowBox}>
              <Text style={styles.rowLabel}>Naam:</Text>
              <Text style={styles.rowText}>{pizza.name}</Text>
            </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowBox}>
              <Text style={styles.rowLabel}>Size:</Text>
              <Text style={styles.rowText}>{pizza.size}</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowLabel}>Ingredients:</Text>
            <Text style={styles.rowText}>{pizza.ingredients.join(", ")}</Text>
          </View>
        </View>
      ));
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>{renderRows()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  rowContainer: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#CACACA",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 8,
    padding: 10,
  },
  rowBox: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  rowLabel: {
    fontWeight: "bold",
    marginRight: 10,
  },
  rowText: {
    flex: 1,
  },
});