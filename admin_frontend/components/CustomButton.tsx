import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";

const CustomButton = (props : any) => {

    const router = useRouter()

    const styles = StyleSheet.create({
          button: {
            width: props.width,
            backgroundColor: '#841584',
            margin:10,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
          },
          buttonText: {
            color: '#fff',
            fontSize: 20,
            },
      
      })

    return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.button_text}</Text>
    </TouchableOpacity>)

}

export default CustomButton

