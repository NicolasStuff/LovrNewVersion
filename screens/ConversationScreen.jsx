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
          database.ref('/users/'+ childSnapshot.key).once('value', function(userSnapshot){
            let userInfo = userSnapshot.val()            
            let infoFromBD = childSnapshot.val()          
            let infoToPush = {
              userId: childSnapshot.key,
              userName: userInfo.first_name,
              userAvatar: userInfo.avatar,
              message: infoFromBD.lastMessage, 
              unRead: infoFromBD.unreadMessages, 
              date: infoFromBD.updated 
            }
            myLastMessages.push(infoToPush)            
            console.log("al intetior -> myLastMessages", myLastMessages)
            // setMyChats(myLastMessages)
          })         
        })        
        console.log("al exterior -> myLastMessages", myLastMessages)
      })
    }
    loadData();

    return () => {
      database.ref('/friends/'+ user).off()
      console.log('friends listener killed')
    }
  }, [])

  //for take usesr info
  // const takeUserInfoFirebase = (snapshot) => {    
  //   let myLastMessages = [];
    
  //   snapshot.forEach(function (childSnapshot) {
  //     database.ref('/users/'+ childSnapshot.key).once('value', function (userSnapshot){
  //         let userInfo = userSnapshot.val()            
  //         let infoFromBD = childSnapshot.val()          
  //         let infoToPush = {
  //           userId: childSnapshot.key,
  //           userName: userInfo.first_name,
  //           userAvatar: userInfo.avatar,
  //           message: infoFromBD.lastMessage, 
  //           unRead: infoFromBD.unreadMessages, 
  //           date: infoFromBD.updated 
  //         }
  //         myLastMessages.push(infoToPush)            
  //         console.log("takeUserInfoFirebase -> myLastMessages", myLastMessages)
          
  //         setMyChats(myLastMessages)
  //       }     
  //     )
  //   })   
  // }


  let myChatList = myChats.map((e,i) =>{
    return (<ListItem style={{flex:1}}
      key={i}
      leftAvatar={{
        source: { uri: !e.userAvatar ? null : e.userAvatar },
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
    {/* <ListItem style={{flex:1}}
      leftAvatar={{
        title: "NI",
        source: require("../assets/images/5.jpg"),
      }}
      title='Nicolas'
      subtitle='Nicolas'
      chevron
      bottomDivider
      onPress={()=>{console.log('pres on qsdfqsd')}}
    /> */} 
    { myChatList }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
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