import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StatusBar, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';

export default function ManageNgo() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get(API_BASE_URL + 'admin/ngos');
        setNgos(response.data);
      } catch (error) {
        Alert.alert('Error', 'Could not fetch NGOs.');
      }
    };
    fetchNgos();
  }, []);

  const handleDeleteNgo = async (id :String) => {
    try {
      Alert.alert('Are you sure?', 'This action cannot be undone',[
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          },
          {
            text: 'OK',
            onPress: async () => {
              const response = await axios.delete(API_BASE_URL + `admin/delete-ngo/${id}`);
              if(response.status == 200){
                setNgos(ngos.filter(ngo => ngo._id !== id));
                Alert.alert('NGO Deleted');
              }
          }}
      ])
     
    } catch (error) {
      Alert.alert('Error', 'Could not delete NGO.');
    }
  };

  return (
    <ScrollView>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 

      <Text style={styles.header}>Manage NGO Accounts</Text>

      {
        ngos ? 
        ngos.map((item, key) => (
          <View style={styles.card}>
          <Text style={styles.cardTitle}>NGO Name: {item.ngo_name}</Text>
          <Text style={{marginBottom: 10}}>Registration No.:{item.reg_id}</Text>
          <Button title="Delete NGO 🗑️" onPress={() => handleDeleteNgo(item._id)} />
        </View>
        ))
        :
        <Text>No NGO Account Found</Text>
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
    marginTop: 10,
  },
});
