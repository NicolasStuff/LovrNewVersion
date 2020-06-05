/* Hide Error Messages */ 
console.disableYellowBox = true;

import React, {useEffect} from 'react';

/* Navigation Between Screens */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

/* Screens */
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import MapScreen from'./screens/MapScreen';
import ContactsScreen from './screens/ContactsScreen';
import EditProfile from './screens/EditProfileScreen';
import MyChatScreen from './screens/MyChatScreen';
import ChatScreen from './screens/ChatScreen';

/* createStackNavigator() */
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="MyChat" component={MyChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
