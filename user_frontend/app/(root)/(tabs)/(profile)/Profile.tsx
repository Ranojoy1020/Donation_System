import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar, Alert, ToastAndroid } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import CustomButton from '../../../../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/Network';
import { baseStyles } from '@/constants/BasicStyles';


export default function Profile() {
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      ToastAndroid.show('Logged out successfully', 1000);
      navigation.navigate('Login'); // Redirect to Login page
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  };

  return (
    <View style={[baseStyles.base_container, styles.container]}>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 

      {/* Profile Picture */}
      <Image
        style={styles.profilePic}
        source={{ uri: API_BASE_URL + 'userImages/'+ userData.profile_pic || require('../../../../assets/images/user.png') }}
      />

      {/* User Name */}
      <Text style={styles.username}>{userData.user_fname + " " + userData.user_lname}</Text>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {navigation.navigate('EditProfile', navigation)}}
        >
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('(donation)', navigation)}
        >
          <Text style={styles.optionText}>Donation History</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Settings', navigation)}
        >
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('PastQuery', navigation)}
        >
          <Text style={styles.optionText}>Past Queries</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Query', navigation)}
        >
          <Text style={styles.optionText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      <CustomButton button_text="Log-out" width={ 0.9 * Dimensions.get('window').width } onPress={handleLogout} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal:0,
    backgroundColor: '#f9f9f9',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60, // Makes it a circle
    borderColor:"#333",
    borderWidth:1,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    paddingVertical: 15,
    borderBlockColor: "#555",
    borderWidth: 0.5,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },

});
