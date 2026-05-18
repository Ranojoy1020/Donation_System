import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => (
    <Stack>
        <Stack.Screen name='Login' options={{headerShown: false}}/>
        <Stack.Screen name='Register' options={{headerShown: false}}/>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
    </Stack>
)

export default _layout