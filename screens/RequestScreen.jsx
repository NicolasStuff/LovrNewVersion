import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import { database } from './firebase';

/* Gradient Background Color Module */

function RequestScreen({navigation, user, onReceiver}) {
  const [myChatRequest, setMyChatRequest] = useState([])

  useEffect(() => {
    console.log('requesChat Screen up!!')
    const takeChatRequests = () => { 
      database.ref('/chatRequest/'+ user).on('value', function(chatSnap){
        let chatsRequestArray = [];
        chatSnap.forEach(function (childSnapshot) {
          let infoFromBD = childSnapshot.val()
          let infoToPush = {
            senderId: childSnapshot.key,
            content: infoFromBD.content,
            date: infoFromBD.createdAt
          }
          chatsRequestArray.push(infoToPush)  
        })        
        takeUserAvatar(chatsRequestArray)
      });
    }
    takeChatRequests()
  }, [])

  const takeUserAvatar = async (array) => {
    let requestList = [];
    await Promise.all(array.map(async function (item) {
      await database.ref('/users/'+ item.senderId).once('value', function (snapshot){
        let userInfo = snapshot.val()
        item.senderAvatar = userInfo.avatar
        item.senderName = userInfo.first_name
        requestList.push(item)
      })
    }))
    setMyChatRequest(requestList)
  }

  const handleAccept = (senderId) => {
    //add sender to friends
    database.ref('/friends/' + user + '/' + senderId).set(
      {
        lastMessage: 'New match, say hello!',
        unreadMessages: 1,
        updated: Date.now()
      }
    )
  
    //delete chat request request
    database.ref('/chatRequest/' + user + '/' + senderId).remove()
  }

  const handleRefuse = (senderId) => {
    //delete chat request request
    database.ref('/chatRequest/' + user + '/' + senderId).remove()
  }

  let myRequestList = myChatRequest.map((e,i) =>{
    return (
      <ListItem
          onPress={()=> {onReceiver(e.senderId); navigation.navigate('Profile')}}
          key={i}
          leftAvatar={{
            source: { uri: e.senderAvatar },
          }}
          title={e.senderName}
          subtitle= {e.content}
          rightElement={<View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={()=> handleAccept(e.senderId)}
                          >
                            <Image source={require('../assets/Logos/AcceptChatLogo.png')} style={styles.responseChat}></Image>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={()=> handleRefuse(e.senderId)}
                          >
                            <Image source={require('../assets/Logos/RefuseChatLogo.png')} style={styles.responseChat}></Image>
                          </TouchableOpacity>
                        </View>}
      />
    )
  })


  return (
    <View style={styles.container}>
      <View>
        {myRequestList}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  responseChat: {
    width: 30,
    height: 30,
    marginRight: 10,
  }
});

//for redux
function mapStateToProps(state) {
  return { user : state.user}
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
)(RequestScreen);
