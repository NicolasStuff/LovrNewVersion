import React, {useState, useEffect} from 'react';
import { database, counterRef } from './firebase';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, Dimensions  } from 'react-native';
import {connect} from 'react-redux';
import AutoScroll from 'react-native-auto-scroll'

/* Gradient Background Color Module */
import { Avatar } from 'react-native-elements';
//icons
import { Ionicons } from '@expo/vector-icons'; 

function ChatScreen({navigation, user, receiver}) {
  console.log("ChatScreen -> receiver", receiver)
  const [idChat, setIdChat] = useState(user > receiver ? `${user}-${receiver}` : `${receiver}-${user}`)
  const [text, setText] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [reciverInfo, setReceiverInfo] = useState({})

  useEffect(() => {
    function loadMessages() {
      //taking receiver info
      database.ref('/users/'+ receiver).once('value', function(userSnap){
        let userInfo = userSnap.val()
        setReceiverInfo(userInfo)
      });
      //taking messages
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
    var timeDate = `${dateCreated.getHours()}:${dateCreated.getMinutes() < 10 ? '0'+dateCreated.getMinutes() : dateCreated.getMinutes()}`;

    if (msg.sender === user) {
        return (
          <View key={i} style={{flexDirection:'row-reverse',  alignItems: 'flex-end', flexDirection:'column', alignSelf:'flex-end'}}>
            <View style={styles.user}>
              <Text style={styles.textUser}>{msg.content}</Text>
            </View>
            <View>
              <Text style={{marginRight: 15, fontSize:12}}>{timeDate}</Text>
            </View>
          </View>
        )
    } else {
        return (
          <View key={i} style={{flexDirection:'row', alignItems: 'flex-start', flexDirection:'column', alignSelf:'flex-start'}}>
                <View style={{flexDirection:'row', alignItems: 'flex-end'}}>
                  <Avatar
                    rounded
                    source={{ uri : reciverInfo.avatar}}
                    size="small"
                  />
                  <View style={styles.sender}>
                    <Text style={styles.textSender}>{msg.content}</Text>
                  </View>                  
                </View>
                <View>
                  <Text style={{marginLeft: 5, fontSize:12}}>{timeDate}</Text>
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
            source={{ uri : reciverInfo.avatar}}
            size="large"
          />
          <Text style={{fontSize: 25}}>{reciverInfo.first_name}</Text>
        </View>
      </View>
      <SafeAreaView style={{flex: 1, marginTop: 100 }}>
        <AutoScroll contentContainerStyle={styles.contentContainer}>
          {listMessageItem}
        </AutoScroll>
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
    marginBottom: 2,
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
    marginBottom: 2,
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
