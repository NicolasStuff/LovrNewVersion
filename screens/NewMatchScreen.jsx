import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SettingScreen({navigation}) {
  return (
    <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={styles.container}>
        <View style={styles.structure}>
          <Image source={require('../assets/Logos/NewMatchLogoBlanck.png')} style={styles.cercles}></Image>
          <Image source={require('../assets/images/Franck.jpg')} style={styles.imageCenter}></Image>
        </View>

        <Text style={{color: "white", fontSize: 14, alignItems: 'center', justifyContent: 'center',}}>YES! Franck t'as envoyé un message</Text>

        <View style={styles.ViewButton}>
            <TouchableOpacity style={styles.SendMessage}>
                <Text>Envoyer un message</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity>
            <Text style={styles.PassMessage}>passer</Text>
        </TouchableOpacity>
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
  },
  imageCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
  },
  ViewButton: {
    shadowOffset: { width: 10, height: 10 }, 
    shadowColor: '#FFFFFF',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: 180,
    borderRadius: 25,
  },
  SendMessage: {
    height: 50,
    width: 250,
    borderRadius: 25,
    backgroundColor : "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center',
  },
  PassMessage: {
    color: 'white'
  },
});
