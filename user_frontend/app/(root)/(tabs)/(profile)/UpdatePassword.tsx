import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '@/components/BackButton';
import { baseStyles } from '@/constants/BasicStyles';

export default function UpdatePassword({navigation}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.patch(
        `${API_BASE_URL}user/updatePassword`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      Alert.alert('Success', 'Password updated successfully');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to update password');
    }
  };

  return (
    <View style={baseStyles.base_container}>
      <BackButton onPress={() => navigation.goBack()}/>
      <Text>Update Password</Text>
      <TextInput
        style={baseStyles.base_input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={baseStyles.base_input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={baseStyles.base_input}
        placeholder="Confirm New Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button
        title={loading ? 'Updating...' : 'Update Password'}
        onPress={handlePasswordUpdate}
        disabled={loading}
      />
    </View>
  );
}

