import React, { useState } from 'react';
import { CheckBox, Button, Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const PizzaAdjust = () => {
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
            <Button
              title="25 cm"
              buttonStyle={styles.sizeButton}
              onPress={() => handleSizeSelect('25 cm')}
            />

            <Button
              title="30 cm"
              buttonStyle={styles.sizeButton}
              onPress={() => handleSizeSelect('30 cm')}
            />
            <Button
              title="35 cm"
              buttonStyle={styles.sizeButton}
              onPress={() => handleSizeSelect('35 cm')}
            />


      <CheckBox
        title="Pepperoni"
        checked={checked}
        onPress={handleCheckboxChange}
      />

      <CheckBox
        title="Mozarella"
        checked={checked}
        onPress={handleCheckboxChange}
      />

      <CheckBox
        title="Tomato"
        checked={checked}
        onPress={handleCheckboxChange}
      />

      <CheckBox
        title="Mushroom"
        checked={checked}
        onPress={handleCheckboxChange}
      />

          <Button
            title="Confirm pizza"
            buttonStyle={styles.confirmButton}
            onPress={() => setModalVisible(false)}
          />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButton: {
    marginTop:15,
    width: 150,
    marginBottom: 5,
    backgroundColor: '#3282B8',
    borderRadius: 8,
  },

  confirmButton: {
  marginTop:10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 8,
  },
  selectedSizeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default PizzaAdjust;