import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left:20
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
  },
});
