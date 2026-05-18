import BackButton from '@/components/BackButton';
import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// const navigation = useNavigation();

const options = [
  { label: 'Update Password', screen: 'UpdatePassword' },
  { label: 'Communication Preference', screen: 'CommPref' },
];

export default function Settings({navigation}) {
  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={() => navigation.navigate(item.screen, navigation)}
    >
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackButton onPress={ () => navigation.goBack()}/>
      <Text style={styles.header}>Settings</Text>
      
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item) => item.screen}
        style={styles.optionsList}
      />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionsList: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
