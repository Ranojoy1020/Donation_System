import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert, StyleSheet, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/Network';

export default function CreateCampaign() {
  const [donationType, setDonationType] = useState('');
  const [collectionDate, setCollectionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [amount, setAmount] = useState(0);
  const [donorMessage, setDonorMessage] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });
    
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const submitDonation = async () => {
    // Basic validation
    if (!donationType) {
      Alert.alert('Error', 'Please select a donation type.');
      return;
    }

    if (!selectedDate) {
      Alert.alert('Error', 'Please select a collection date.');
      return;
    }

    if (!selectedTime) {
      Alert.alert('Error', 'Please select a collection time.');
      return;
    }

    if (amount && isNaN(amount)) {
      Alert.alert('Error', 'Amount must be a number.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('user_id', await AsyncStorage.getItem('userid').then(v=>v))
    formData.append('donation_type', donationType);
    formData.append('collectionSchedule', selectedDate);
    formData.append('collectionTime', selectedTime);
    formData.append('amount', amount || 0);
    formData.append('donorMessage', donorMessage);
    
    if (imageUri) {
      formData.append('item_img', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'donation-image.jpg'
      });
    }

    try {
      const response = await axios.post(API_BASE_URL + 'user/makeDonations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + await AsyncStorage.getItem('token').then(v=>v)
        },
      });
      setLoading(false);
      Alert.alert('Success', 'Donation submitted successfully!');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to submit donation.');
    }
  };

  const handleDateChange = (event : any, selectedDate :any) => {
    const currentDate = selectedDate || collectionDate;
    setShowDatePicker(false);
    setCollectionDate(currentDate);
    setSelectedDate(currentDate.toDateString());
  };

  const handleTimeChange = (event : any, selectedTime : any) => {
    const currentTime = selectedTime || collectionDate;
    setShowTimePicker(false);
    setCollectionDate(currentTime);
    setSelectedTime(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (

    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 
      <Text style={styles.header}>Create Campaign</Text>
      <Text style={styles.header}>[ W . I . P ]</Text>

      <Text style={styles.label}>Donation Type</Text>
      <Picker
        mode='dropdown'
        selectedValue={donationType}
        onValueChange={(itemValue : any) => setDonationType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a donation type" value="" />
        <Picker.Item label="Clothes for children" value="Clothes for children" />
        <Picker.Item label="Clothes for adults" value="Clothes for adults" />
        <Picker.Item label="Toys" value="Toys" />
        <Picker.Item label="Books" value="Books" />
      </Picker>

      <Text style={styles.label}>Collection Date</Text>
      <Button title={selectedDate || "Pick a Date"} onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={collectionDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()} // Future-only dates
        />
      )}

      <Text style={styles.label}>Collection Time</Text>
      <Button title={selectedTime || "Pick a Time"} onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={collectionDate}
          mode="time"
          display="default"
          onChange={handleTimeChange}
          is24Hour={false}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Amount (if applicable)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Donor Message"
        value={donorMessage}
        onChangeText={setDonorMessage}
      />

      <View style={styles.imagePickerContainer}>
        <Button title="Pick an Image" onPress={pickImage} />
        <Button title="Use Camera" onPress={openCamera} />
      </View>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity style={styles.submitButton} onPress={submitDonation} disabled={loading}>
        <Text style={styles.submitButtonText}>{loading ? 'Submitting...' : 'Submit Donation'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    marginVertical: 5,
    fontWeight: '600',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
