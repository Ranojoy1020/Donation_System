import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Image, RefreshControl, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import {API_BASE_URL} from '../../../../../constants/Network'
import {baseStyles} from '../../../../../constants/BasicStyles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';
import BackButton from '@/components/BackButton';

export default function DonationHistory({navigation}) {
  const [userData, setUserData ] = useState({})   // State to store user data
  const [donations, setDonations] = useState([]); // State to store donation data
  const [loading, setLoading] = useState(true);   // State to manage loading state
  const [error, setError] = useState("");       // State to handle errors
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    data()
  }, [refreshing])
  
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
        url: API_BASE_URL +'user/user_donation_history/' + userData._id,
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
      <TouchableOpacity
      onPress={() => navigation.navigate("DonationDetail", { donation: item }, navigation)}>
      
      <View style={styles.donationItem}>
        <Text style={{
          backgroundColor: (item.donation_status == 'Pending') ? '#bf2c34' : (item.donation_status == 'Scheduled') ? '#f5c26b' : '#4fb06d', 
          color: '#fff',
          padding: 5, borderRadius: 5, fontSize: 12, fontWeight: 'bold',
          height: 25,width:75,
          position:'absolute',
          right:5, top: 5,
          textAlign:'center',
        }}>
          {item.donation_status}
        </Text>
        <Text style={styles.donationDate}>{date.toLocaleDateString()}</Text>
        <Text style={styles.donationTitle}>{item.title}</Text>
        <Text>NGO Name: {item.ngo_id}</Text>
        <Text>Type: {item.donation_type}</Text>
      </View>
    </TouchableOpacity>

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

  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch data or refresh your content here
    await data();
    setRefreshing(false);
  };

  // Render donation list or error message
  return (
    <ScrollView contentContainerStyle={baseStyles.base_container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <BackButton onPress={() => navigation.goBack()}/>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
        <Text style={styles.header}>Donation History</Text>
        
        <FlatList
          data={donations}
          keyExtractor={(item) => item._id}
          renderItem={renderDonation}
          ListEmptyComponent={
            <ImageBackground style={{height:'100%', width:'100%'}} source={require('../../../../../assets/images/onboarding_img2.jpg')} resizeMode='cover'>
              <Text>No donation history found.</Text>
            </ImageBackground>
          }
        />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
  donationStatus: {
    fontWeight: 'bold',
    color:'#fff'
  },
  donation_img:{
    width: 90,
    height: 95,
    position:'absolute',
    right:0,
    borderBottomRightRadius:5,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});
