import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Donate from './Donate';
import {ProfileStack} from './(profile)/ProfileStack';

const Tab = createBottomTabNavigator()

const _layout = () => (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarHideOnKeyboard:true}}>
        <Tab.Screen name='Home' component={Home} options={{
          headerShown: false, 
          tabBarShowLabel:false,
          tabBarIcon: () => (
            <Ionicons name="home" size={25}/>
          ),
          tabBarActiveBackgroundColor:"#007AFF"
        }}/>

        <Tab.Screen name='Donate' component={Donate} options={{
          headerShown: false,
          tabBarShowLabel:false,
          tabBarIcon: () => (
            <Ionicons name='accessibility-outline' size={25}/>
          ),
          tabBarActiveBackgroundColor:"#007AFF"
        }}/>
        <Tab.Screen name='(profile)' component={ProfileStack} options={{
          headerShown: false,
          tabBarShowLabel:false,
          tabBarIcon: () => (
            <Ionicons name="person" size={25}/>
          ),
          tabBarActiveBackgroundColor:"#007AFF",
        }}/>
    </Tab.Navigator>
  )

export default _layout