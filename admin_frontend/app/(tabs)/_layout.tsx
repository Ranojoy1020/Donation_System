import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './Home';
import VerifyNgo from './VerifyNgo';
import ManageNgo from './ManageNgo';
import ManageUser from './ManageUser';
import AdminQuery from './Query';

const Tab = createBottomTabNavigator()

export default function TabLayout() {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveBackgroundColor: "#3333", tabBarItemStyle:{borderColor:"#ffffff"}}}>

      <Tab.Screen name='Home' component={HomePage} options={{
        headerShown : false,
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return <TabBarIcon name='home' />
        }
        
      }}/>
      
      <Tab.Screen name='VerifyNgo' component={VerifyNgo} options={{
        headerShown : false,
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return <TabBarIcon name='checkmark-circle' />
        }
      }}/>

      <Tab.Screen name='ManageNgo' component={ManageNgo} options={{
        headerShown : false,
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return <TabBarIcon name='business' />
        }
      }}/>

      <Tab.Screen name='ManageUser' component={ManageUser} options={{
        headerShown : false,
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return <TabBarIcon name='person-add' />
        }
      }}/>

      <Tab.Screen name='AdminQuery' component={AdminQuery} options={{
        headerShown : false,
        tabBarShowLabel: false,
        tabBarIcon: () => {
          return <TabBarIcon name='help' />
        }
      }}/>

    </Tab.Navigator>
  );
}
