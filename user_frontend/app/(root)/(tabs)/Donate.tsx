import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert, StyleSheet, StatusBar, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@/constants/Network';

export default function MakeDonation() {
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

  const [userData, setUserData] = useState({}); // State to store user data

  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    await AsyncStorage.getItem('user').then((value) => {
      if (value !== null) {
        setUserData(JSON.parse(value));
      }
    });
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your media library');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const submitDonation = async () => {
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
    formData.append('user_id', userData._id);
    formData.append('donation_type', donationType);
    formData.append('collection_schedule', selectedDate + ' ' + selectedTime);
    formData.append('amount', amount || 0);
    formData.append('donor_msg', donorMessage);

    if (imageUri) {
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'donation.jpg',
      });
    }

    try {
      const response = await axios.post(API_BASE_URL + 'user/makeDonation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      });
      setLoading(false);
      Alert.alert('Success', 'Donation submitted successfully!');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to submit donation.');
      console.log(error.response.data);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
        <Text style={styles.header}>Make a Donation</Text>
      <View style={styles.card}>

        <Text style={styles.label}>Donation Type</Text>
        <Picker
          mode="dropdown"
          selectedValue={donationType}
          onValueChange={(itemValue) => setDonationType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a donation type" value="" />
          <Picker.Item label="Clothes for children" value="Clothes for children" />
          <Picker.Item label="Clothes for adults" value="Clothes for adults" />
          <Picker.Item label="Toys" value="Toys" />
          <Picker.Item label="Books" value="Books" />
        </Picker>

        <View style={styles.date_TimePicker_Container}>
          <Text style={styles.label}>Collection Date</Text>
          <Button title={selectedDate || 'Pick a Date'} onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={collectionDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(false);
                setSelectedDate(date.toDateString());
              }}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.date_TimePicker_Container}>
          <Text style={styles.label}>Collection Time</Text>
          <Button title={selectedTime || 'Pick a Time'} onPress={() => setShowTimePicker(true)} />
          {showTimePicker && (
            <DateTimePicker
              value={collectionDate}
              mode="time"
              display="default"
              onChange={(event, time) => {
                setShowTimePicker(false);
                setSelectedTime(time.toLocaleTimeString());
              }}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Donor Message (Optional)"
          value={donorMessage}
          onChangeText={setDonorMessage}
        />

        <View style={styles.imagePickerContainer}>
          <Button title="Select Image" onPress={pickImage} />
        </View>

        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        <TouchableOpacity style={styles.submitButton} onPress={submitDonation} disabled={loading}>
          <Text style={styles.submitButtonText}>{loading ? 'Submitting...' : 'Submit Donation'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f3',
  },
  card: {
    width: '90%',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    padding: 20,
    margin:20,
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#ffffff',
    elevation: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginVertical: 5,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 15,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    margin:5,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
