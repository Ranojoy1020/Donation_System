import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert, RefreshControl, StatusBar } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/Network';
import axios from 'axios';


export default function HomePage() {

  const navigation = useNavigation()

  const [userData, setUserData ] = useState({})
  const [donations, setDonations] = useState([]); // State to store donation data
  const [loading, setLoading] = useState(true);   // State to manage loading state
  const [error, setError] = useState("");       // State to handle errors

  // Fetch donation data when the component loads
  useEffect(() => {
    fetchDonationHistory();
  }, [userData]);

  // Function to fetch donation history from API
  const fetchDonationHistory = async () => {
    
    try {
      const response = await axios({
        method : 'GET',
        url: API_BASE_URL +'user/user_donation_history/' + userData._id ,
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

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch data or refresh your content here
    await data();
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 

      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Image source={{ uri: API_BASE_URL + 'userImages/'+ userData.profile_pic }} style={styles.profilePic} />
        <Text style={styles.welcomeText}>Welcome back, {userData.user_fname}</Text>
      </View>

      {/* Quick Actions */}
      {/* <View style={styles.quickActions}>
        <Button title="Make a Donation" onPress={() => navigation.navigate('Donate')} />
        <Button title="View Donation History" onPress={() => navigation.navigate('DonationHist')} />
      </View> */}

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.activityScroll}>
          
          {
          donations ? 
            donations.map(donation => (
            <View key={donation._id} style={styles.activityCard}>
              <Text style={styles.activityItem}>{donation.donation_type}</Text>
              
              <Image
              source={{ uri: API_BASE_URL + 'donations/' + donation.item_img_path}}
              style={styles.donation_img}
              />

              <Text style={styles.activityDate}>
                {new Date(donation.createdAt).toLocaleString('en-IN', {day:'numeric', month: 'numeric', year:'numeric'})}
              </Text>
            </View>
          ))
          :
          <Text>No recent activity found</Text>
          
          }
      </ScrollView>


      {/* Featured Campaigns */}
      {/* <Text style={styles.sectionTitle}>Featured Campaigns</Text>
      <View style={styles.campaignList}>
        <TouchableOpacity onPress={() => navigation.navigate('CampaignDetails', { id: 1 })}>
          <Text style={styles.campaignItem}>Winter Coat Drive</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CampaignDetails', { id: 2 })}>
          <Text style={styles.campaignItem}>Back-to-School Supplies</Text>
        </TouchableOpacity>
      </View> */}

      {/* Notifications/Updates */}
      {/* <Text style={styles.sectionTitle}>Updates</Text>
      <View style={styles.notifications}>
        <Text style={styles.notificationItem}>New campaign: "Toys for Tots" starting next week!</Text>
        <Text style={styles.notificationItem}>Reminder: Upcoming donation collection on Oct 28, 2023</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    height: Dimensions.get('window').height * 1.2,
    backgroundColor: '#fff',
  },
  welcomeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor:'#333',
    borderWidth: 1,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  donation_img:{
    width: 120,
    height: 120,
    borderRadius:10,
    margin:5,
    alignSelf: 'center'
  },
  activityList: {
    paddingHorizontal: 10,
  },
  activityItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  campaignList: {
    paddingHorizontal: 10,
  },
  campaignItem: {
    fontSize: 16,
    marginVertical: 5,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  notifications: {
    paddingHorizontal: 10,
    paddingBottom:30
  },
  notificationItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  activityScroll: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  activityCard: {
    flex:1,
    width: 150,
    height:220,
    padding: 10,
    marginRight:5,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  activityDate: { 
    fontSize: 14, 
    color: "#555", 
    position: 'absolute',
    bottom: 10,
    left:10
  },
  
});
