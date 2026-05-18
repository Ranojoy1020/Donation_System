import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile'
import EditProfile from './EditProfile'
import Settings from './Settings'
import Query from './Query';
import PastQuery from './PastQuery';
import { DonationStack } from './(donation)/DonationStack';
import UpdatePassword from './UpdatePassword';
import CommunicationPreference from './CommPref';

const Stack = createStackNavigator()

export const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
    <Stack.Screen name='Profile' component={Profile}/>
    <Stack.Screen name='(donation)' component={DonationStack}/>
    <Stack.Screen name='EditProfile' component={EditProfile}/>
    <Stack.Screen name='Settings' component={Settings}/>
    <Stack.Screen name='UpdatePassword' component={UpdatePassword}/>
    <Stack.Screen name='CommPref' component={CommunicationPreference}/>
    <Stack.Screen name='PastQuery' component={PastQuery}/>
    <Stack.Screen name='Query' component={Query}/>
  </Stack.Navigator>
)