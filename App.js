/* Hide Error Messages */ 
console.disableYellowBox = true;

import React, {useEffect, useState} from 'react';
import { Button } from 'react-native';
import { Input } from 'react-native-elements';


/* Navigation Between Screens */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

/* Screens */
import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import MapScreen from'./screens/MapScreen';
import ConversationScreen from './screens/ConversationScreen';
import RequestScreen from './screens/RequestScreen';
import NewMatchScreen from './screens/NewMatchScreen';


import EditProfile from './screens/EditProfileScreen';
import MyChatScreen from './screens/MyChatScreen';
import ChatScreen from './screens/ChatScreen';

// for Redux
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import user from './reducers/user';
import receiver from './reducers/receiver';
const store = createStore(combineReducers({ user, receiver }));

/* createStackNavigator() */
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  
  return (
    <Tab.Navigator tabBarOptions= {{labelStyle: { textTransform: 'none' }}}>
      <Tab.Screen name="Conversation" component={ConversationScreen} />
      <Tab.Screen name="Demande de chat" component={RequestScreen} />
    </Tab.Navigator>
  );
}

function MyStack() {

  const [text, setText] = useState()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NewMatch" component={NewMatchScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}} />
        <Stack.Screen name="Settings" component={SettingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Chat" component={MyTabs} options={{
              headerTitle: () => (
              <Input
                placeholder='Rechercher'
                placeholderTextColor= 'red'
                leftIcon={{ type: 'Feather', name: 'search' , color: '#FF3C5E'}}
                onChangeText={value => setText( value )}
                style={{borderBottomColor: 'red' }}
              />
            ),
          }}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Contacts" component={ContactsScreen} /> */} 
        {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
}
