import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import supabase from "../../utils/supabase";

export default function PizzaList( {route, navigation} ) {
  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchPizzas() {
    const { data, error } = await supabase.from("orders").select("pizzas").eq("id", route.params.id);
    setPizzas(data[0].pizzas);
    // console.log(data[0].pizzas)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchPizzas();
  }, [])

  const renderRows = () => {
      return pizzas.map((pizza, pizzaIndex) => (
        <View style={styles.rowContainer} key={pizzaIndex}>
          {console.log(pizza)}
            <View style={styles.rowBox}>
              <Text style={styles.rowLabel}>Name:</Text>
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
            <Text style={styles.rowText}>{pizza.ingredients}</Text>
          </View>
        </View>
      ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>{loading ? <Text>Loading...</Text> : renderRows()}</ScrollView>
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