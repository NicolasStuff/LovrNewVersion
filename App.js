/* Hide Error Messages */ 
console.disableYellowBox = true;

import React from 'react';

/* Navigation Between Screens */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

/* Screens */
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import MapScreen from'./screens/MapScreen';
import ContactsScreen from './screens/ContactsScreen';
import ChatScreen from './screens/ChatScreen';

/* createStackNavigator() */
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
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