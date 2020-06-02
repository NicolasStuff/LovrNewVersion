import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {auth, authF} from './firebase'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({navigation}) {
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

  async function signInWithGoogleAsync() {
    console.log('here')
    try {
      const result = await Google.logInAsync({
        androidClientId: '917655662400-kaaf84i2pdpbu3e5gcmpeignd0hrs6bc.apps.googleusercontent.com',
        iosClientId: '917655662400-qc10lkdllkhqt01oj3rerl5je0cl04di.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        behavior: 'web'
      });      
      if (result.type === 'success') {
        const credential = authF.GoogleAuthProvider.credential(result.idToken, result.accessToken) 
        auth.signInWithCredential(credential).catch((err)=>{
            console.log('error de la muerte google', err)
        })
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
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
        <View style={{marginBottom: 150}}>
          <Image source={require("../assets/Logo-White.png")} style={styles.Logo}/>
          <Image source={require("../assets/LovrTypo.png")} style={styles.LogoTypo}/>
        </View>
        <Text style={styles.Textconnection}>Se connecter avec : </Text>
      <Button
      rounded
      title="Sign In With Facebook"
      style={styles.Facebook}
      onPress={() => logIn()}
      />
      <Button
      rounded
      title="Sign In With Google"
      style={styles.Google}
      onPress={() => signInWithGoogleAsync()}
      />
      <Button
      rounded
      title="Go to Settings"
      onPress={() => navigation.navigate('Settings')}
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
  Logo: {
    width: 120,
    height: 100,
  },
  LogoTypo: {
    alignItems: 'center',
    width: 120,
    height: 50,
  },
  Textconnection: {
    color: "white", 
    marginBottom: 20,
    fontSize: 20
  },
  Facebook: {
    color: "#3B589E"
  }
});