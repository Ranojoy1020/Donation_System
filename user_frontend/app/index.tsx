import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router'
import CustomButton from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [activePage, setActivePage] = useState(0); // State for the active page

  const router = useRouter()

  const handleScroll = (event: any) => {
    // Calculate the active page index based on scroll position
    const pageIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActivePage(pageIndex);
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
    
    <ImageBackground style={styles.container} source={require('../assets/images/onboarding_img1.jpg')} resizeMode='cover'>
    <StatusBar barStyle={'light-content'} backgroundColor={'black'} translucent={false} /> 
      
      {/* Scrollable Onboarding Screens */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Ensures scroll events are captured smoothly
      >

        {/* First Onboarding View */}
        <View style={styles.screen}>
          {/* <Text style={styles.title}>{url}</Text> */}
          <Text style={styles.description}>
            Discover new ways to engage with your community and manage activities.
          </Text>
        </View>

        {/* Second Onboarding View */}
        <View style={styles.screen}>
          <Text style={styles.title}>Track Donations</Text>
          <Text style={styles.description}>
            Easily track your donations and contributions through our intuitive platform.
          </Text>
        </View>

        {/* Third Onboarding View */}
        <View style={styles.screen}>
          <Text style={styles.title}>Ready to Start?</Text>
          <Text style={styles.description}>
            Sign up today or login to access all features and begin your journey.
          </Text>

          {/* Buttons for Get Started and Login */}
          <View style={styles.buttonContainer}>
            <CustomButton width={0.8 * width} button_text='Register' onPress={() => router.push('./Register')} />
            <CustomButton width={0.8 * width} button_text='Login' onPress={() => router.push('./Login')} />
          </View>
        </View>
      </ScrollView>

      {/* Page Indicator */}
      <View style={styles.indicatorContainer}>
        <View style={[styles.indicator, activePage === 0 ? styles.activeIndicator : null]} />
        <View style={[styles.indicator, activePage === 1 ? styles.activeIndicator : null]} />
        <View style={[styles.indicator, activePage === 2 ? styles.activeIndicator : null]} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  screen: {
    width: width,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#fff'
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color:'#fff'
  },
  buttonContainer: {
    height: 0.2 * height,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems:'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  indicator: {
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#007AFF', // Change color for active indicator
  },
});
