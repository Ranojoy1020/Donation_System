import { createStackNavigator } from '@react-navigation/stack';
import DonationHistory from './DonationHist';
import DonationDetail from './DonationDetail';


const Stack = createStackNavigator()

export const DonationStack = () => (
  <Stack.Navigator initialRouteName="DonationHist" screenOptions={{headerShown: false}}>
    <Stack.Screen name='DonationHist' component={DonationHistory}/>
    <Stack.Screen name='DonationDetail' component={DonationDetail}/>
  </Stack.Navigator>
)