import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import axios from 'axios';
import {API_BASE_URL} from '../../../../constants/Network'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DonationHistory() {
  const [userData, setUserData ] = useState({})   // State to store user data
  const [donations, setDonations] = useState([]); // State to store donation data
  const [loading, setLoading] = useState(true);   // State to manage loading state
  const [error, setError] = useState("");       // State to handle errors

  
  useEffect(() => {
    data()
  }, [])
  
  const data = async () => {
    await AsyncStorage.getItem('user')
    .then( value => {
      if (value !== null) {
        setUserData(JSON.parse(value))
      }
    })
  }


  // Fetch donation data when the component loads
  useEffect(() => {
    fetchDonationHistory();
  }, [userData]);

  // Function to fetch donation history from API
  const fetchDonationHistory = async () => {
    
    try {
      const response = await axios({
        method : 'GET',
        url: API_BASE_URL +'ngo/ngo_donation_history/' + userData._id,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('token').then(v=>v)
        }
      });
      setDonations(response.data); // Assuming the response contains donation array
    } catch (err) {
      console.error(err);
      setError('Failed to fetch donation history');
      Alert.alert('Error', 'Failed to fetch donation history.');
    } finally {
      setLoading(false); // Stop loading when request is done
    }
  };

  // Render each donation item
  const renderDonation = ({ item }) => {    
    const date = new Date(item.createdAt)
    return(
    <View style={styles.donationItem}>
      {/* <Text style={styles.donationText}>Amount: {item.amount} {item.currency}</Text> */}
      <Text style={styles.donationText}>Date: {date.toLocaleString('en-IN', {day:'numeric', month: 'numeric', year:'numeric'})}</Text>
      <Text style={styles.donationText}>NGO: {item.ngo_id}</Text>
    </View>
    )
  };

  // Display loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#841584" />
        <Text>Loading donation history...</Text>
      </View>
    );
  }

  // Render donation list or error message
  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={donations}
          keyExtractor={(item) => item._id}
          renderItem={renderDonation}
          ListEmptyComponent={
            // <ImageBackground style={styles.onResImg} source={require('../../../../assets/images/noResult.jpg')} resizeMode='contain'>
              <Text style={{fontSize : 20}}>No donation history found.</Text>
            // </ImageBackground>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donationItem: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  donationText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },

  onResImg : {
    height:'100%',
    width: '100%',
    resizeMode: 'contain'
  }
});
