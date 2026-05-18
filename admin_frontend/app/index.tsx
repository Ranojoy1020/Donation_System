import React, { useEffect, useState } from 'react';
import {useRouter} from 'expo-router'
import { View, Text, TextInput, Button, Alert, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {API_BASE_URL} from '../constants/Network'
import CustomButton from '@/components/CustomButton';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // API request
    try {
      setLoading(true);

      const response = await axios.post(API_BASE_URL + 'admin/login',{
        "admin_email": email,
        "admin_passwd" : password
      });
      
      setLoading(false);

      if (response.status == 200) {    
        AsyncStorage.setItem('token', response.data.token)
        AsyncStorage.setItem('user', JSON.stringify(response.data.user))
        setEmail('')
        setPassword('')
        // Example: Navigate to Home screen with user data
        router.push('./Home');
      } else if(response.status == 401) {
        // Login failed, display error message
        Alert.alert('Error', response.data.message || 'Login failed.');
      }
    } catch (error : any) {
      setLoading(false);
      // Handle errors like network issues
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.push('./Home'); // or main screen
      }
    };
    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 

      <Text style={styles.title}>Admin Login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <CustomButton button_text={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});