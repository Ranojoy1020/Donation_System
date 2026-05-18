import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { API_BASE_URL } from '@/constants/Network'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CommunicationPreference({navigation}) {
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    push: false,
  });

  const handleToggle = (preference : any) => {
    setPreferences((prev : any) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
  };

  const handleSavePreference = async () => {
    const selectedPreferences = Object.keys(preferences).filter(
      (key) => preferences[key]
    );

    try {
      const response = await axios.post(API_BASE_URL + 'user/save_pref', {
        // user_id : ,
        com_pref: selectedPreferences,
      }, {
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      });
      console.log('Preferences saved:', response.data);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Communication Preference</Text>

      <View style={styles.listContainer}>
        {['email', 'sms', 'push'].map((preference) => (
          <View key={preference} style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>{preference.charAt(0).toUpperCase() + preference.slice(1)}</Text>
            <Switch
              value={preferences[preference]}
              onValueChange={() => handleToggle(preference)}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePreference}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f3',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
