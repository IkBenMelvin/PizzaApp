import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import supabase from '../utils/supabase.js';

const BonusScreen = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const baseURL = 'https://xbxjnbuwdqtdstrkqcpa.supabase.co/storage/v1/object/public/images/';

  async function getAllPizzas() {
    const { data, error } = await supabase.from('pizzas').select('*');
    if (error) {
      console.error('Error fetching pizzas:', error.message);
    } else {
      setPizzas(data);
    }
  }

  React.useEffect(() => {
    getAllPizzas();
  }, []);

  return (
    <ScrollView>
      <Text style={styles.allItemsText}>Pizza's in the bonus:</Text>

      <View style={styles.pizzaContainer}>
        {pizzas.map((pizza) => (
          <View key={pizza.id} style={styles.pizzaCard}>
            <Image source={{ uri: `${baseURL}${pizza.id}` }} style={styles.pizzaImage} />

            <Text style={styles.pizzaHeader}>{pizza.name}</Text>
            <View style={styles.pizzaIngredients}></View>
            <Text style={styles.pizzaSubtext}>{pizza.price}</Text>

          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = {
  allItemsText: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 30,
    fontWeight: 'bold',
  },
  pizzaContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
    minHeight: 400,
    maxHeight: 1000,
  },
  pizzaCard: {
    width: '40%',
    height: '60%',
    minHeight: 150,
    maxHeight: 250,
    backgroundColor: '#ddd',
    margin: 10,
    borderRadius: 10,
  },
  pizzaImage: {
    width: '100%',
    height: '50%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  pizzaHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  pizzaSubtext: {
    fontSize: 16,
    marginLeft: 5,
  },
};

export default BonusScreen;
