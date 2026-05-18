import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile'
import DonationHistory from './DonationHist'
import EditProfile from './EditProfile'
import Settings from './Settings'

const Stack = createStackNavigator()

export const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
    <Stack.Screen name='Profile' component={Profile}/>
    <Stack.Screen name='DonationHist' component={DonationHistory}/>
    <Stack.Screen name='EditProfile' component={EditProfile}/>
    <Stack.Screen name='Settings' component={Settings}/>
  </Stack.Navigator>
)