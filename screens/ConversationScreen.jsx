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
      console.log("loadData -> snapshot", snapshot)
        let myLastMessages = [];
        snapshot.forEach(function (childSnapshot) {
          let infoFromBD = childSnapshot.val()
          let infoToPush = {
            userId: childSnapshot.key,
            userName: null,
            userAvatar: null,
            message: infoFromBD.lastMessage, 
            unRead: infoFromBD.unreadMessages, 
            date: infoFromBD.updated 
          }
          myLastMessages.push(infoToPush)  
        })        
        takeUserInfoFirebase(myLastMessages)
      })
    }
    loadData();

    return () => {
      database.ref('/friends/'+ user).off()
      console.log('friends listener killed')
    }
  }, [])

  //for take useer info from users collection
  const takeUserInfoFirebase = async (messagesArray) => { 
    let conversationList = [];
    await Promise.all(messagesArray.map(async function (item) {
      await database.ref('/users/'+ item.userId).once('value', function (userSnapshot){
        let userInfo = userSnapshot.val()      
        item.userName = userInfo.first_name;
        item.userAvatar = userInfo.avatar
        conversationList.push(item)
      })
    }))   
    setMyChats(conversationList)
  }


  let myChatList = myChats.map((e,i) =>{
    return (
    <ListItem
      key={i}
      leftAvatar={{
        source: { uri: e.userAvatar },
      }}
      title={e.userName}
      subtitle={e.message}
      badge={e.unRead !=0 ? { value: e.unRead, textStyle: { color: 'white' } } : null}
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