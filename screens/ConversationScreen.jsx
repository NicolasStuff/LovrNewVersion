import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import { database } from './firebase';


/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

function ConversationScreen({navigation, user, onReceiver}) {
  console.log('user in Conversation screen =>', user)

  const [myChats, setMyChats] = useState([])
  
  useEffect(() => {
    //geting friends and last messages from fireabse
    function loadData() {      
      database.ref('/friends/'+ user).orderByChild('updated').on('value', function(snapshot) {
        let myLastMessages = [];
        snapshot.forEach(function (childSnapshot) {
          let infoFromBD = childSnapshot.val()
          let infoToPush = {
            userId: childSnapshot.key,
            userName: infoFromBD.name,
            userAvatar: infoFromBD.avatar,
            message: infoFromBD.lastMessage, 
            unRead: infoFromBD.unreadMessages, 
            date: infoFromBD.updated 
          }
          myLastMessages.push(infoToPush)            

          // database.ref('/users/'+ childSnapshot.key).once('value', function(userSnapshot){
          //   let userInfo = userSnapshot.val()            
          //   let infoFromBD = childSnapshot.val()          
          //   let infoToPush = {
          //     userId: childSnapshot.key,
          //     userName: userInfo.first_name,
          //     userAvatar: userInfo.avatar,
          //     message: infoFromBD.lastMessage, 
          //     unRead: infoFromBD.unreadMessages, 
          //     date: infoFromBD.updated 
          //   }
          // })         
        })        
        // takeUserInfoFirebase(myLastMessages)
        setMyChats(myLastMessages)
      })
    }
    loadData();

    return () => {
      database.ref('/friends/'+ user).off()
      console.log('friends listener killed')
    }
  }, [])

  //for take useer info for users collection
  // const takeUserInfoFirebase = (messagesArray) => { 

  //   messagesArray.forEach(function (childSnapshot) {
  //     database.ref('/users/'+ childSnapshot.key).once('value', function (userSnapshot){
  //         let userInfo = userSnapshot.val()            
  //         console.log("takeUserInfoFirebase -> userInfo", userInfo)
  //     }     
  //     )
  //   })   
  // }


  let myChatList = myChats.map((e,i) =>{
    return (
    <ListItem
      key={i}
      leftAvatar={{
        source: { uri: e.userAvatar },
      }}
      title={e.userName}
      subtitle={e.message}
      badge={{ value: e.unRead, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
      chevron
      bottomDivider
      onPress={()=>{onReceiver(e.userId); navigation.navigate('ChatScreen') }}
    />)
  })

  return (
    <View style={styles.container}>
    { myChatList }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// for redux
function mapStateToProps(state) {
  return { user : state.user }
}

function mapDispatchToProps(dispatch) {
  return {
    onReceiver: function(receiver) { 
      dispatch( {type: 'addReceiver', receiver }) 
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ConversationScreen);