import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingScreen({navigation}) {
  return (
    <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={styles.container}>
        <View style={styles.structure}>
          <Image source={require('../assets/Logos/NewMatchLogoBlanck.png')} style={styles.cercles}></Image>
          <Image source={require('../assets/images/Franck.jpg')} style={styles.imageCenter}></Image>
        </View>
        <Text style={{color: "white", fontSize: 14, alignItems: 'center', justifyContent: 'center',}}>YES! Franck t'as envoyé un message</Text>
      </View>
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cercles: {
    width: 250,
    height: 250,
    position: "absolute",
  },
  structure: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200,
  },
  imageCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",

  }
});
