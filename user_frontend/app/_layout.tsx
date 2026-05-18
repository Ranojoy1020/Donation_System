import { StyleSheet, Text, View } from 'react-native'
import { Slot, Stack } from "expo-router"

const RootLayout = () => (
  <Stack>
    <Stack.Screen name='index'/>
    <Stack.Screen name='(root)'/>
  </Stack>
)
