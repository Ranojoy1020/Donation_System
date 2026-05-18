import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/Network';


export default function HomePage() {

  const navigation = useNavigation()

  const [userData, setUserData ] = useState({})
  
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

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Banner */}
      <View style={styles.welcomeBanner}>
        <Image source={{ uri: API_BASE_URL + 'ngoImages/'+ userData.ngo_logo }} style={styles.profilePic} />
        <Text style={styles.welcomeText}>Welcome back, {userData.ngo_name}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button title="Make a Donation" onPress={() => navigation.navigate('Donate')} />
        <Button title="View Donation History" onPress={() => navigation.navigate('./(profile)/DonationHist')} />
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityList}>
        {/* Mock data for demonstration */}
        <Text style={styles.activityItem}>Donation to Children’s Books Campaign - Oct 20, 2023</Text>
        <Text style={styles.activityItem}>Donation to Winter Clothing Drive - Sep 30, 2023</Text>
      </View>

      {/* Featured Campaigns */}
      <Text style={styles.sectionTitle}>Featured Campaigns</Text>
      <View style={styles.campaignList}>
        <TouchableOpacity onPress={() => navigation.navigate('CampaignDetails', { id: 1 })}>
          <Text style={styles.campaignItem}>Winter Coat Drive</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CampaignDetails', { id: 2 })}>
          <Text style={styles.campaignItem}>Back-to-School Supplies</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications/Updates */}
      <Text style={styles.sectionTitle}>Updates</Text>
      <View style={styles.notifications}>
        <Text style={styles.notificationItem}>New campaign: "Toys for Tots" starting next week!</Text>
        <Text style={styles.notificationItem}>Reminder: Upcoming donation collection on Oct 28, 2023</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  notificationItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});
