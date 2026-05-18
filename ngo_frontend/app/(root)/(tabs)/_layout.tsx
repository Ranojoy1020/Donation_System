import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Donate from "./CreateCampign";
import { ProfileStack } from "./(profile)/ProfileStack";
import { CollectionStack } from "./(collection)/CollectionStack";
import CreateCampaign from "./CreateCampign";
import DonationDetail from "./(collection)/DonationDetail";

const Tab = createBottomTabNavigator();

const _layout = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => <Ionicons name="home" size={25} />,
        tabBarActiveBackgroundColor: "#007AFF",
      }}
    />

    <Tab.Screen
      name="(collection)"
      component={CollectionStack}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => <Ionicons name="checkbox-outline" size={25} />,
        tabBarActiveBackgroundColor: "#007AFF",
      }}
    />

    {/* <Tab.Screen
      name="CreateCampaign"
      component={CreateCampaign}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => <Ionicons name="document-text" size={25} />,
        tabBarActiveBackgroundColor: "#007AFF",
      }}
    /> */}

    <Tab.Screen
      name="(profile)"
      component={ProfileStack}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => <Ionicons name="person" size={25} />,
        tabBarActiveBackgroundColor: "#007AFF",
      }}
    />
  </Tab.Navigator>
);

export default _layout;
