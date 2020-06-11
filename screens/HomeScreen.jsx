import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import {auth, authF, database} from './firebase'
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { SocialIcon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import {connect} from 'react-redux';

/* Gradient Background Color Module */

function HomeScreen({navigation, onUser}) {

  //const [connected, setConnected] = useState(false)
  //Detecting loged user
  useEffect(() => {
    async function serchingLogUsers() {
        auth.onAuthStateChanged(user => {
            if(user){
                onUser(user.uid)
                navigation.navigate('Map')
            } else{
                console.log('no users loged')
            }
        })
    }
    serchingLogUsers();    
  }, [])

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
        //setConnected = true;
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

        const credential = authF.FacebookAuthProvider.credential(token);
        
        auth.signInWithCredential(credential).then((user)=>{
          //testing if is a new user
          if(user.additionalUserInfo.isNewUser === true) {
            //creating user profile in firebase
            database.ref('users/' + user.user.uid).set({
              uid: user.user.uid,
              createdAt: Date.now(),
              active: true,
              first_name: user.additionalUserInfo.profile.first_name,
              last_name: user.additionalUserInfo.profile.last_name,
              mail: user.user.email,
              city: 'test city',
              job: 'test job',
              desc: 'test descrip',
              avatar: user.user.photoURL,
              photos: [user.user.photoURL],
              lovable: false,
              premium: false,
              lovable_date: Date.now()    
           })
          }
        }).catch((err)=>{
          console.log('error de la muerte', err)
        });
        // navigation.navigate('Map')
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: '917655662400-kaaf84i2pdpbu3e5gcmpeignd0hrs6bc.apps.googleusercontent.com',
        iosClientId: '917655662400-qc10lkdllkhqt01oj3rerl5je0cl04di.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        behavior: 'web'
      });      
      if (result.type === 'success') {
        //setConnected = true;
        const credential = authF.GoogleAuthProvider.credential(result.idToken, result.accessToken) 
        
        auth.signInWithCredential(credential).then((user)=>{
          //testing if is a new user
          if(user.additionalUserInfo.isNewUser === true) {
            //creating user profile in firebase
            database.ref('users/' + user.user.uid).set({
              uid: user.user.uid,
              createdAt: Date.now(),
              active: true,
              first_name: user.additionalUserInfo.profile.given_name,
              last_name: user.additionalUserInfo.profile.family_name,
              mail: user.additionalUserInfo.profile.email,
              city: 'test city',
              job: 'test job',
              desc: 'test descrip',
              avatar: user.additionalUserInfo.profile.picture,
              photos: [user.additionalUserInfo.profile.picture],
              lovable: false,
              premium: false,
              lovable_date: Date.now()    
           })
          }
        }).catch((err)=>{
            console.log('error de la muerte google', err)
        })
        // navigation.navigate('Map')
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }    
  }

  
  return (
    <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/Logos/Logo-White.png')} style={styles.Logo}/>
            <Image source={require('../assets/Logos/LovrTypo.png')} style={styles.LogoTypo}/>
            <View style={{marginTop: 110}}>
              <Text style={styles.text}>Se connecter.</Text>
              <SocialIcon
                title='Se connecter avec Facebook'
                onPress={
                  () => logIn()
                }
                button
                type='facebook'
                style={styles.signInFacebook}
              />
              <SocialIcon
                title='Se connecter avec Google'
                onPress={() => signInWithGoogleAsync()}
                button
                type='google'
                light='true'
                style={styles.signInGoogle}
              />
            </View>
        </LinearGradient>

  );
}
const styles = StyleSheet.create({
  Logo: {
    width: 158,
    height: 123,
  },
  LogoTypo: {
    width: 115,
    height: 50,
  },
  text: {
    fontSize: 18,
    paddingBottom: 10,
    color: 'white',
    fontWeight: 'normal',
  },
  signInFacebook: {
    width: 250,
    height: 60,
    fontSize: 15,
    backgroundColor: '#4267B2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  signInGoogle: {
    width: 250,
    height: 60,
    fontSize: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    textDecorationColor: 'black',
    marginTop: 25,
  },
  });

  // for Redux
  function mapDispatchToProps(dispatch) {
    return {
      onUser: function(user) { 
        dispatch( {type: 'addUser', user }) 
      }
    }
  }
  
  export default connect(
    null, 
    mapDispatchToProps
  )(HomeScreen);