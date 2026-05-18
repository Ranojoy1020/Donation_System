import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StatusBar, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

export default function ManageUser() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_BASE_URL + 'admin/users');
      setUsers(response.data);      
    } catch (error : any) {
      Alert.alert('Error', 'Could not fetch users.');
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id : String) => {
    try {
      Alert.alert('Are you sure?', 'This action cannot be undone',[
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: 'OK',
            onPress: async () => {
              const response = await axios.delete(API_BASE_URL + `admin/delete-user/${id}`);
              if (response.status == 200) {
                Alert.alert('User Deleted');
                setUsers(users.filter(user => user._id !== id));
              }
          }}
      ])
      
    } catch (error) {
      Alert.alert('Error', 'Could not delete user.');
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch data or refresh your content here
    await fetchUsers();
    setRefreshing(false);
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/>}>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 

      <Text style={styles.header}>Manage Donor Accounts</Text>

      {
        users ?
        users.map((item, index) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.user_fname} {item.user_lname}</Text>
            <Text style={{marginBottom: 10}}>User ID:{item._id}</Text>
            <Button title="Remove User 🗑️" onPress={() => handleDeleteUser(item._id)} />
          </View>
        ))
        :
        <Text>No users found</Text>
      }
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:10,
  },
});
