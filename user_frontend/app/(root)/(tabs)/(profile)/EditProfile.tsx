import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';
import { states_cities } from '@/constants/States_Cities';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import BackButton from '@/components/BackButton';
import { baseStyles } from '@/constants/BasicStyles';

export default function EditProfileScreen({ navigation }) {
  const [profileData, setProfileData] = useState({
    user_fname: '',
    user_lname: '',
    user_email: '',
    user_mobile: '',
    user_addr: '',
    user_city: '',
    user_state: '',
    user_country: '',
    user_pincode: '',
    profile_pic: '',
  });

  const countryOptions = [
    // { label: 'United States', value: 'United States' },
    // { label: 'Canada', value: 'Canada' },
    { label: 'India', value: 'India' },
  ];

  const stateOptions = Object.keys(states_cities)

  const cityOptions = profileData.user_state ? states_cities[profileData.user_state] : []
  
  const fetchProfileData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value) setProfileData(JSON.parse(value));
    } catch (error) {
      console.log('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}user/update_profile`, profileData);
      if (response.status === 200) Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.log('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <ScrollView style={baseStyles.base_container}>
      <BackButton onPress={ () => navigation.goBack()}/>
      <Text style={baseStyles.header_text}>Edit Profile</Text>

      <Image
        source={{ uri: API_BASE_URL + 'userImages/' + profileData.profile_pic }}
        style={styles.profilePic}
      />

      {/* First Name */}
      <Text style={baseStyles.base_input_label}>First Name</Text>
      <TextInput
        style={baseStyles.base_input}
        value={profileData.user_fname}
        onChangeText={(text) => setProfileData({ ...profileData, user_fname: text })}
      />

      {/* Last Name */}
      <Text style={baseStyles.base_input_label}>Last Name</Text>
      <TextInput
        style={baseStyles.base_input}
        value={profileData.user_lname}
        onChangeText={(text) => setProfileData({ ...profileData, user_lname: text })}
      />

      {/* Email */}
      <Text style={baseStyles.base_input_label}>Email</Text>
      <TextInput style={baseStyles.base_input} value={profileData.user_email} editable={false} />

      {/* Mobile */}
      <Text style={baseStyles.base_input_label}>Mobile</Text>
      <TextInput
        style={baseStyles.base_input}
        value={profileData.user_mobile}
        keyboardType="numeric"
        maxLength={10}
        onChangeText={(text) => setProfileData({ ...profileData, user_mobile: text })}
      />


      {/* Address */}
      <Text style={baseStyles.base_input_label}>Street Address</Text>
      <TextInput
        style={baseStyles.base_input}
        value={profileData.user_addr}
        onChangeText={(text) => setProfileData({ ...profileData, user_addr: text })}
      />

      {/* Country Dropdown */}
      <Text style={baseStyles.base_input_label}>Country</Text>
      <RNPickerSelect
        onValueChange={(value) => setProfileData({ ...profileData, user_country: value })}
        items={countryOptions}
        placeholder={{ label: 'Select a country', value: null }}
        style={{ inputAndroid: baseStyles.base_input, inputIOS: baseStyles.base_input }}
        value={profileData.user_country}
      />

      {/* State Dropdown */}
      <Text style={baseStyles.base_input_label}>State</Text>
      <RNPickerSelect
        onValueChange={(value) => setProfileData({ ...profileData, user_state: value })}
        items={stateOptions.map((state) => ({ label: state, value: state }))}
        placeholder={{ label: 'Select a state', value: null }}
        style={{ inputAndroid: baseStyles.base_input, inputIOS: baseStyles.base_input }}
        value={profileData.user_state}
      />

      {/* City Dropdown */}
      <Text style={baseStyles.base_input_label}>City</Text>
      <RNPickerSelect
        onValueChange={(value) => setProfileData({ ...profileData, user_city: value })}
        items={cityOptions.map((state : any) => ({ label: state, value: state }))}
        placeholder={{ label: 'Select a city', value: null }}
        style={{ inputAndroid: baseStyles.base_input, inputIOS: baseStyles.base_input }}
        value={profileData.user_city}
      />

      {/* Pin Code */}
      <Text style={baseStyles.base_input_label}>Pin Code</Text>
      <TextInput
        style={baseStyles.base_input}
        value={profileData.user_pincode}
        onChangeText={(text) => setProfileData({ ...profileData, user_pincode: text })}
      />

      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#333',
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 10,
  }
});
