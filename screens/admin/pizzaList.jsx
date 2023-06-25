import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function PizzaList() {
  const tableData = [
    {
      maat: ["Job"],
      pizzas: ["hawaii"],
      ingredients: "perronopi, sanana, moorhsum",
    },
    {
      maat: ["Job"],
      pizzas: ["hawaii"],
      ingredients: "mah, sanana, moorhsum",
    },
    {
      maat: ["Job"],
      pizzas: ["hawaii"],
      ingredients: "perronopi, sanana, moorhsum",
    },
    {
      maat: ["30"],
      pizzas: ["hawaii"],
      ingredients: "perronopi, sanana, moorhsum",
    },
    {
      maat: ["25", "30", "25"],
      pizzas: ["hawaii", "margherita", "pepperoni"],
      ingredients: "perronopi, sanana, moorhsum",
    },
  ];

  const renderRows = () => {
    return tableData.flatMap((record, index) => {
      const { maat, pizzas, ingredients } = record;

      return pizzas.map((pizza, pizzaIndex) => (
        <View style={styles.rowContainer} key={`${index}-${pizzaIndex}`}>
          {maat[pizzaIndex] && (
            <View style={styles.rowBox}>
              <Text style={styles.rowLabel}>Maat:</Text>
              <Text style={styles.rowText}>{maat[pizzaIndex]}</Text>
            </View>
          )}
          <View style={styles.rowContainer}>
            <View style={styles.rowBox}>
              <Text style={styles.rowLabel}>Pizza:</Text>
              <Text style={styles.rowText}>{pizza}</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.rowLabel}>Ingredients:</Text>
            <Text style={styles.rowText}>{ingredients}</Text>
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