import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import supabase from "../../utils/supabase";
import Navbar from "../../components/navBar";

export default function PizzaList( {route, navigation} ) {
  const [pizzas, setPizzas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const sizes = [{id: 0, style: '25cm'}, {id: 1, style: '35 cm'}, {id: 2, style: 'calzone'}];

  async function fetchPizzas() {
    // TODO fix this
    const { data, error } = await supabase.from("orders").select("pizzas").eq("id", route.params.id);
    // const chosenSize = sizes.find(size => size.id === selectedSize).style
    setPizzas(data[0].pizzas);
    // console.log(JSON.parse(data[0].pizzas[0]).name);
    setLoading(false)
  }

  React.useEffect(() => {
    fetchPizzas();
  }, [])

  const renderRows = () => {
      return pizzas.map((pizza, pizzaIndex) => {
        const currentPizza = JSON.parse(pizza);
        return (
          <View style={styles.rowContainer} key={pizzaIndex}>
            {/* {console.log(pizza.name)} */}
              <View style={styles.rowBox}>
                <Text style={styles.rowLabel}>Name:</Text>
                <Text style={styles.rowText}>{currentPizza.name}</Text>
              </View>
              <View style={styles.rowBox}>
                <Text style={styles.rowLabel}>Size:</Text>
                <Text style={styles.rowText}>{currentPizza.size}</Text>
              </View>
            <View style={styles.rowBox}>
              <Text style={styles.rowLabel}>Ingredients:</Text>
              <Text style={styles.rowText}>{currentPizza.ingredients.join(", ")}</Text>
            </View>
          </View>
        )
      });
  };

  return (
    <>
      <Navbar navigation={navigation}></Navbar>
      <View style={[styles.container, {marginTop: 100}]}>
        <ScrollView>{loading ? <Text>Loading...</Text> : renderRows()}</ScrollView>
      </View>
    </>
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