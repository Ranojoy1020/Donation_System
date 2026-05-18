import { createStackNavigator } from '@react-navigation/stack';
import CollectionReq from './CollectionReq';
import DonationDetail from './DonationDetail';

const Stack = createStackNavigator()

export const CollectionStack = () => (
    <Stack.Navigator initialRouteName="CollectionReq" screenOptions={{headerShown: false}}>
      <Stack.Screen name='CollectionReq' component={CollectionReq}/>
      <Stack.Screen name='DonationDetail' component={DonationDetail}/>
    </Stack.Navigator>
)

