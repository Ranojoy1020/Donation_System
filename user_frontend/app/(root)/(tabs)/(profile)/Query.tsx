import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseStyles } from '@/constants/BasicStyles';
import BackButton from '@/components/BackButton';

export default function Query({navigation}) {
  const [message, setMessage] = useState('');

  const [profileData, setProfileData ] = useState({})

  useEffect(() => {
    data()
  }, [])
  
  const data = async () => {
    await AsyncStorage.getItem('user')
    .then( value => {
      if (value !== null) {
        setProfileData(JSON.parse(value))
      }
    })
  }

  const handleSubmit = async () => {
    if (!message) {
      Alert.alert('Error', 'Enter message to send');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}user/submitQuery`, {
        query_msg : message,
        user_id : profileData._id
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Your feedback/query has been submitted!');
        setMessage('');
      }
    } catch (error) {
        console.log(error);
        
      Alert.alert('Error', 'Unable to submit your feedback. Please try again later.');
    }
  };

  return (
    <View style={baseStyles.base_container}>
      <Text style={styles.title}>Send Query</Text>
      <BackButton onPress={() => navigation.goBack()} />
      <TextInput
        style={[baseStyles.base_input, styles.textArea]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  textArea: {
    height: 100,
  },
});
