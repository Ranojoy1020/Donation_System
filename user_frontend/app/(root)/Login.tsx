import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TextInput, Button, Alert, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../constants/Network';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateEmail = (email : string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_BASE_URL + 'user/login', {
        user_email: email,
        user_passwd: password,
      });

      setLoading(false);

      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        setEmail('');
        setPassword('');
        router.push('./Home');
      } else {
        Alert.alert('Error', response.data.message || 'Login failed.');
      }
    } catch (error : any) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/onboarding_img2.jpg')}
      resizeMode="cover"
    >
      <StatusBar barStyle="dark-content" translucent={false} />

      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

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

        <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Translucent background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
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
