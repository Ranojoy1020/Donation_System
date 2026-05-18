import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, StatusBar, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';

export default function VerifyNgo() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchUnverifiedNgos = async () => {
      try {
        const response = await axios.get(API_BASE_URL + 'admin/unverified-ngos');
        setNgos(response.data);
      } catch (error) {
        Alert.alert('Error', 'Failed to load NGOs.');
      }
    };
    fetchUnverifiedNgos();
  }, []);

  const handleVerifyNgo = async (id : String) => {
    try {
      const response = await axios.put(API_BASE_URL + `admin/verify-ngo/${id}`);
      if (response.status == 200) {
        Alert.alert('NGO Verified');
        setNgos(ngos.filter(ngo => ngo._id !== id));
      }
    } catch (error) {
      Alert.alert('Error', 'Verification failed.');
    }
  };

  return (
    <ScrollView>

      <StatusBar barStyle={'dark-content'} translucent={false} /> 

      <Text style={styles.header}>Verify NGO Accounts</Text>

      {
        ngos ?

        ngos.map((item, key) => 
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.ngo_name}</Text>
            <Text style={{marginBottom: 10}}>Registration No.:{item.reg_id}</Text>
            <Button title="Verify    ✅" onPress={() => handleVerifyNgo(item._id)} />
          </View>
        )
        :
        <Text>No New NGO Found</Text>
        
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
