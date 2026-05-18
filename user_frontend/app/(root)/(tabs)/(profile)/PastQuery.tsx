import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '@/components/BackButton';
import { baseStyles } from '@/constants/BasicStyles';

export default function PastQuery({navigation}) {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [userData, setUserData ] = useState({})   // State to store user data
  const [refreshing, setRefreshing] = useState(false);


  
  const data = async () => {
      await AsyncStorage.getItem('user')
      .then( value => {
          if (value !== null) {
              setUserData(JSON.parse(value))
            }
        })
    } 
    
    useEffect(() => {
      fetchQueries();
    }, [userData])    

  const fetchQueries = async () => {
    try {
        await data()
      const response = await axios.get(`${API_BASE_URL}user/userQuery/${userData._id}`);    
      setQueries(response.data);  
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch queries.');      
    }
  };

  const renderQueryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedQuery(item)} style={styles.queryItem}>
      <Text style={styles.queryTitle}>{item.query_msg}...</Text>
      <Text style={styles.queryStatus}>Status: {item.query_status}</Text>
    </TouchableOpacity>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch data or refresh your content here
    await data();
    setRefreshing(false);
  };


  return (
    <ScrollView style={baseStyles.base_container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <BackButton onPress={() => navigation.goBack()}/>
      <Text style={baseStyles.header_text}>Your Queries</Text>
      {!selectedQuery ? (
        <>
          <FlatList
            data={queries}
            renderItem={renderQueryItem}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <View>
          <Text style={styles.title}>Query Details</Text>
          <Text style={styles.detailText}>Message: {selectedQuery.query_msg}</Text>
          <Text style={styles.detailText}>Response: {selectedQuery.query_resp || 'No response yet'}</Text>
          <Text style={styles.detailText}>Status: {selectedQuery.query_status}</Text>
          <TouchableOpacity onPress={() => setSelectedQuery(null)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back to Queries</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  queryItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  queryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  queryStatus: {
    position:'absolute',
    top:10,
    right:10,
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
