import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import supabase from "../../utils/supabase.js";
import Navbar from '../../components/navBar.jsx';

const AllUsers = ({ navigation }) => {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.log('Error fetching users:', error.message);
    } else {
      setUsers(data);
    }
  }

  const renderHeader = () => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Phone Number</Text>

        <Text style={styles.headerText}>Street</Text>
        <Text style={styles.headerText}>Postal</Text>
        <Text style={styles.headerText}>Created At</Text>

      </View>
    );
  };

  const renderRows = () => {
    return users.map((user) => (
      <View style={styles.tableRow} key={user.id}>
        <Text style={styles.rowText}>{user.id}</Text>
        <Text style={styles.rowText}>{user.name}</Text>
        <Text style={styles.rowText}>{user.email}</Text>
        <Text style={styles.rowText}>+{user.number}</Text>
        <Text style={styles.rowText}>{user.street}</Text>
        <Text style={styles.rowText}>{user.postal}</Text>
        <Text style={styles.rowText}>{user.created_at}</Text>

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
    fontWeight: 'bold',
    fontSize: 16,
    width: 100,
    textAlign: 'center',
  },
  tableRow: {
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowText: {
    fontSize: 14,
    width: 100,
    textAlign: 'center',
  },
});

export default AllUsers;



