import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {database} from './firebase';

function NewMatchScreen({navigation, newMatch}) {
  console.log("NewMatchScreen -> newMatch", newMatch)
  const [matchInfo, setMatchInfo] = useState({})

  useEffect(() => {
    database.ref('/users/'+ newMatch.senderId).once('value', function(userSnap){
      let userInfo = userSnap.val()
      setMatchInfo(userInfo)
    })    
  }, [])



  
  return (
    <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={styles.container}>
        <View style={styles.structure}>
          <Image source={require('../assets/Logos/NewMatchLogoBlanck.png')} style={styles.cercles}></Image>
          <Image source={{ uri : matchInfo.avatar}} style={styles.imageCenter}></Image>
        </View>

        <Text style={{color: "white", fontSize: 14, alignItems: 'center', justifyContent: 'center', marginTop:50}}>YES! {matchInfo.first_name} t'as envoyé un message</Text>

        <TouchableOpacity 
        onPress={()=> navigation.navigate('Chat')}
        style={styles.SendMessage}>
            <Text style={{color: "#FF164B"}}>Go to my demandes des chat</Text>
        </TouchableOpacity>

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
  },
  imageCenter: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
  },
  structure: {
    alignItems: 'center',
    justifyContent: 'center',
  },
//   ViewButton: {
//     shadowOffset: { width: 10, height: 10 }, 
//     shadowColor: '#FFFFFF',
//     shadowOpacity: 1,
//     elevation: 3,
//     backgroundColor: 'white',
//     borderRadius: 25,
//     marginTop: 125,
//   },
  SendMessage: {
    marginTop: 125,
    height: 50,
    width: 250,
    borderRadius: 25,
    backgroundColor : "#FFFFFF",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  PassMessage: {
    color: 'white',
    marginTop: 15,
  },
});

function mapStateToProps(state) {
  return { newMatch : state.newMatch }
}

export default connect(
  mapStateToProps, 
  null
)(NewMatchScreen);
