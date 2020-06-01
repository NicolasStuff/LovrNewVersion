import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import {auth, authF} from './firebase'
import * as Facebook from 'expo-facebook';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  async function logIn() {
    try {
      await Facebook.initializeAsync('2524688944298263');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

        const credential = authF.FacebookAuthProvider.credential(token);
        console.log("logIn -> credential", credential)
        
        auth.signInWithCredential(credential).catch((err)=>{
          console.log('error de la muerte', err)
        });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


  return (
    <View style={styles.container}>
    <LinearGradient
          colors={['rgba(255,177,153,1)', 'rgba(255,8,68,1)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 1000,
          }}
        />
      <Text>HomeScreen</Text>
      <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Settings', { name: 'Jane' })
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
