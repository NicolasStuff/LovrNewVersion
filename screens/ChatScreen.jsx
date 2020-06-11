import React, {useState, useEffect} from 'react';
import { database, counterRef } from './firebase';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions  } from 'react-native';
import {connect} from 'react-redux';
import Constants from 'expo-constants';

/* Gradient Background Color Module */
import { Avatar } from 'react-native-elements';
//icons
import { Ionicons } from '@expo/vector-icons'; 

function ChatScreen({navigation, user, receiver}) {
  console.log("ChatScreen -> receiver", receiver)
  const [idChat, setIdChat] = useState(user > receiver ? `${user}-${receiver}` : `${receiver}-${user}`)
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    function loadMessages() {
      database.ref('chats/'+ idChat).on('value', function(snapshot) {
          let messages = [];
          snapshot.forEach(e =>{
              messages.push(e.val())
          });
          setMessageList(messages)
      });
      //setting unreadMessages to 0
      database.ref(`/friends/${user}/${receiver}/`).update({
        unreadMessages : 0
      })
    }
    loadMessages()
    return () => {
      database.ref('chats/'+ idChat).off()
      database.ref(`/friends/${user}/${receiver}/`).update({
        unreadMessages : 0
      })
    }
  }, [])

  const sendMessageFirebase = () => {
    database.ref('chats/' + idChat).push({
        createdAt: Date.now(),
        content: text,
        sender: user,
        read: false,
    })
    setText('')
    //update lastmessage and counter of receiver
    database.ref(`/friends/${receiver}/${user}`).update({
      lastMessage : text,
      unreadMessages : counterRef.ServerValue.increment(1),
      updated: Date.now()
    })
  }

  var listMessageItem = messageList.map((msg, i)=>{
    var dateCreated = new Date(msg.createdAt)
    var timeDate = `${dateCreated.getHours()}:${dateCreated.getMinutes()}`;

    if (msg.sender === user) {
        return (
          <View key={i} style={{flexDirection:'row-reverse', alignItems: 'center'}}>
            <View style={styles.user}>
              <Text style={styles.textUser}>{msg.content}</Text>
            </View>
          </View>
        )
    } else {
        return (
          <View key={i} style={{flexDirection:'row', alignItems: 'center'}}>
                <Avatar
                  rounded
                  source={require("../assets/images/5.jpg")}
                  size="small"
                />
                <View style={styles.sender}>
                  <Text style={styles.textSender}>{msg.content}</Text>
                </View>
          </View>
        )
    }
  });


  return (

    <View style={styles.container}>
      <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('Chat')}>
          <Image source={require('../assets/Logos/MapScreenLogoFromChat.png')} style={{width: 75, height: 50}}></Image>
      </TouchableOpacity>
      <View style={{ height: 50, width: 100, zIndex: 2, elevation: 2 }}>
        <View style={styles.header}>
          <Avatar
            rounded
            source={require("../assets/images/5.jpg")}
            size="large"
          />
          <Text style={{fontSize: 25}}>Elodie</Text>
        </View>
      </View>
      <SafeAreaView style={{flex: 1, marginTop: 100 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {listMessageItem}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <TextInput
          value={text}
          onChangeText={text => setText(text)}
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Démarques-toi !"
        />
      <TouchableOpacity onPress={()=> sendMessageFirebase()}>
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
  contentContainer: {
    width: (Dimensions.get('window').width),
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    padding: 20,
  },
  header: {
    zIndex: 2,
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
    padding: 15,
    backgroundColor: '#FF3C5E',
    borderRadius: 25,
    margin: 10,
  },
  textSender: {
    color: 'white',
  },
  user: {
    //flex: 1,
    //flexDirection: 'row',
    padding: 15,
    backgroundColor: '#9C9C9C',
    borderRadius: 25,
    margin: 10,
  },
  textUser: {
    color: 'white',
    textAlign: 'right',
  },
});

//for redux
function mapStateToProps(state) {
  return { receiver : state.receiver, user : state.user }
}


export default connect(
  mapStateToProps, 
  null
)(ChatScreen);
