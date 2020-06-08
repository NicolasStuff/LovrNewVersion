import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import {connect} from 'react-redux';
import { database } from './firebase';


/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

function ConversationScreen({navigation, user}) {
  const [myChats, setMyChats] = useState({})
  console.log('qfdqsfqs =>', user)
  
  useEffect(() => {
    //geting friends and last messages from fireabse
    async function loadData() {
      await database.ref('/friends/'+ user).orderByChild('updated').on('value', function(snapshot) {
        let myFriends = [];
        // console.log('snap valor', snapshot.val())
        snapshot.forEach(e => {
          console.log('este es el e', e)
          // myFriends.push(e.val())
        })        
      })
    }
    loadData();

    return () => {
      database.ref('/friends/'+ user).off()
      console.log('killing listener')
    }
  }, [])


  return (
    <View style={styles.container}>
    <ListItem style={{flex:1}}
      leftAvatar={{
        source: {uri : ("../assets/images/5.jpg")},
      }}
      title={"name"}
      subtitle={"role"}
      chevron
      bottomDivider
      onPress={()=>{console.log('pres on qsdfqsd')}}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

// for redux
function mapStateToProps(state) {
  return { user : state.user }
}

export default connect(
  mapStateToProps, 
  null
)(ConversationScreen);