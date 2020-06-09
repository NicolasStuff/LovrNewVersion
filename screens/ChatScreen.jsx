import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-elements';
//icons
import { Ionicons } from '@expo/vector-icons'; 

export default function ChatScreen({navigation}) {

  const [messages, setMessage] = useState(['Bonjour','Bonjour','Bonjour','Bonjour',])
  const [text, setText] = useState("")

  
  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('Chat')}>
        <Image source={require('../assets/Logos/MapScreenLogoFromChat.png')} style={{width: 75, height: 50}}></Image>
      </TouchableOpacity>
      <View style={styles.header}>
        <Avatar
          rounded
          source={require("../assets/images/5.jpg")}
          size="large"
        />
        <Text style={{fontSize: 25}}>Elodie</Text>
      </View>

      <View style={{flexDirection:'row', alignItems: 'center', margin: 10}}>
        <Avatar
           rounded
           source={require("../assets/images/5.jpg")}
           size="small"
        />
        <View style={styles.sender}>
          <Text style={styles.textSender}>Hello</Text>
        </View>
      </View>
      <View style={{flexDirection:'row', alignItems: 'center'}}>
        <View style={styles.user}>
          <Text style={styles.textUser}>Coucou comment ça va ? :D</Text>
        </View>
      </View>

      
      <View style={styles.footer}>
        <TextInput
          value=""
          onChangeText={text => setText({text})}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Démarques-toi !"
        />
      <TouchableOpacity>
        <Ionicons name="md-send" size={25} color="black" style={styles.send}/>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    padding: 20,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    top: 20,
    padding: 10,
  },
  BackButton: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 60,
    left: 0,
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
  },
  sender: {
    flex: 1,
    padding: 15,
    paddingRight: 15,
    backgroundColor: '#FF3C5E',
    borderRadius: 25,
    margin: 20,
  },
  textSender: {
    color: 'white',
  },
  user: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: 15,
    backgroundColor: '#9C9C9C',
    borderRadius: 25,
    margin: 20,
  },
  textUser: {
    color: 'white',
  },
});
