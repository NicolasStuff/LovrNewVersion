import React, { Component, useEffect, useState} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TouchableHighlight , Dimensions, mapCustom, Alert, Modal, Text, Block } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { database } from './firebase';
const geofire = require('geofire');
import {connect} from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

/* Countdown Become Lovable */
import { CountDown, TimerCountdown } from 'react-native-countdown-component';

function MapScreen({navigation, user, onReceiver, onMatch}) {
  const [mapRegion, setMapRegion] = useState({ latitude: 48.8534, longitude: 2.3488, latitudeDelta: 0.0922, longitudeDelta: 0.0421})
  const [location, setLocation] = useState({coords: { latitude: 48.8534, longitude: 2.3488}})  
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const [countdownVisible, setCountdownVisible] = useState (false);                                             
  
  useEffect(() => {
    //ref for GeoFire
    let fireRef = database.ref('usersPosition')
    let geoFireInstance = new geofire.GeoFire(fireRef);

    const _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        // some code here
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation( location );

      //creating document in firebase with GeoFire
      let locationArray = [location.coords.latitude, location.coords.longitude]
      
      geoFireInstance.set(user, locationArray)
        .then(console.log('user location saved'))
        .catch(err => console.log('err =>', err));  

      //for GeoFire query
      let geoQuery = geoFireInstance.query({
        center: [location.coords.latitude, location.coords.longitude],
        radius: 100
      }); 

      var nearbyUsersArray = [];
      let firsTime = true;

      // geoquery listeners
      geoQuery.on('key_entered', function(key, location, distance) {
        console.log("inside user", key)
        // for first time
        if(firsTime){
          console.log('inside first if')
          let userToPush = {id : key, avatar: null, coords: {latitude: location[0], longitude: location[1]}}
          nearbyUsersArray.push(userToPush)            
        }
        
        //adding new users to state
        if(!firsTime){   
          console.log('inside second if')
          let newUserToPush = {id : key, avatar: null, coords: {latitude: location[0], longitude: location[1]}}
          nearbyUsersArray.push(newUserToPush) 
          updateUsersState(nearbyUsersArray)
        }
      })    
      
      geoQuery.on("key_exited", function(key) {
        console.log('user go out', key)
        // removing user from array
        var filteredUsers = nearbyUsersArray.filter(obj => obj.id != key)
        updateUsersState(filteredUsers)
      });
  
      geoQuery.on("ready", function() {
        console.log('all nearby users taken from frirebase');
        updateUsersState(nearbyUsersArray)
        firsTime = false;
      })

    };
    _getLocationAsync();

    const fakeNotification = () => {
      database.ref('/chatRequest/'+ user).on("child_added", function(snapshot){
        let newRequest = snapshot.val();
        let infoToSend = {
          senderId: snapshot.key,
          content: newRequest.content,
          date: newRequest.createdAt
        }
        onMatch(infoToSend)                
        navigation.navigate('NewMatch')
      })
    }
    fakeNotification()

        
    return () => {
      // detaching listener
      let geoQuery = geoFireInstance.query({
        center: [location.coords.latitude, location.coords.longitude],
        radius: 100
      });
      geoQuery.cancel();
      database.ref('/chatRequest/'+ user).off()
    };
  }, []);

  //to set state of neraby users the first time
  const updateUsersState = async (usersArray) => {
    await Promise.all(usersArray.map(async (obj) => {
      var snapshot = await database.ref('/users/'+ obj.id + '/avatar').once('value')
      obj.avatar = snapshot.val()          
      return obj
    }))
    setNearbyUsers(usersArray)
  }

  const _handleMapRegionChange = mapRegion => {
    setMapRegion({ mapRegion });
  };

  //creating markers
  let myInfo = nearbyUsers != [] ? nearbyUsers.find(e => e.id === user) : null

  var NewUsers = 
    nearbyUsers.map((user,i) => {
      //todo => dont show my fake position
      if(user.coords != null){
        if (user.id) {
          return (
            <Marker
              onPress={()=>{onReceiver(user.id); navigation.navigate('Profile')}}
              style={styles.FrontMarker}
              key={i}
              coordinate={user.coords}
              anchor={{x: 0.5, y: 0.5}}>                
                <View style={styles.marker}>
                    <Image source={ !user.avatar ? require('../assets/images/5.jpg') : {uri: user.avatar}} style={styles.pictureBox}/>
                </View>
            </Marker>
           )
        }
      }
    })

    var CountdownCounter = () => {
      return (
        <CountDown
        size={30}
        until={Math.floor(new Date().getTime()/1000.0)}
        onFinish={() => alert("Vous n'êtes plus LOVABLE")}
        digitStyle={{backgroundColor: 'transparent', borderWidth: 2, borderColor: 'transparent'}}
        digitTxtStyle={{color: '#FFFF'}}
        timeLabelStyle={{color: '#FFFF', fontWeight: 'bold'}}
        separatorStyle={{color: '#FFFF', paddingBottom: 28}}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{h: 'heure', m: 'minutes', s: 'secondes'}}
        showSeparator
      />
      )
    }

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} style={styles.profileLink}>
        <Image source={require('../assets/Logos/ProfileScreenLogo.png')} style={{width: 75, height: 50}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/ChatScreenLogo.png')} style={{width: 75, height: 50}}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.openButton2}
        onPress={() => {
            setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle1}>Devenir Lovable </Text>
      </TouchableOpacity>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Become Lovable has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.modalText}>Félicitations, vous êtes maintenant LOVABLE durant</Text>
          <CountdownCounter/>
         
            <TouchableOpacity
              style={styles.openButton1}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle2}>Continuer</Text>
            </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </View>   

      <MapView style={styles.mapStyle}
      region = { { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } }
      showsUserLocation = { false }
      minZoomLevel={12.5}
      maxZoomLevel={12.5}
      toolbarEnabled={false}
      showsCompass = { false }
      enableHighAccuracy = {true}
      rotateEnabled = { false }
      onRegionChange={_handleMapRegionChange}
      provider={ PROVIDER_GOOGLE }>
          <Marker
              coordinate={ location.coords }
              anchor={{x: 0.5, y: 0.5}}>
                  <View style={styles.radiusFour}>
                      <View style={styles.radiusThree}>
                          <View style={styles.radiusTwo}>
                              <View style={styles.marker}>
                                  <Image source={ !myInfo ? require('../assets/images/5.jpg') : {uri: myInfo.avatar}} style={styles.pictureBox}/>
                              </View>
                          </View>
                      </View>
                  </View>
          </Marker>
          {NewUsers}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileLink: {
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 60,
    left: 0,
  },
  ChatLink: {
    zIndex: 1,
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 60,
    right: 0,
  },
  radiusFour: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center',
},
  radiusThree: {
    width: 230,
    height: 230,
    borderRadius: 230 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center',
},
radiusTwo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center',
},
// radius: {
//     width: 100,
//     height: 100,
//     borderRadius: 100 / 2,
//     overflow: "hidden",
//     backgroundColor: 'rgba(135, 135, 135, 0.44)',
//     alignItems: 'center',
//     justifyContent: 'center'
// },
marker: {
    height: 60,
    width: 60,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 60 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
FrontMarker: {
    zIndex: 1,
  },
mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
profileAndMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
pictureBox: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
    elevation : 100,
  }, 
  centeredView: {
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 20,
  },
  openButton1: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    padding: 10,
    marginTop: 30,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 2,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15
  },
  openButton2: {
    zIndex: 1,
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#36B547",
    borderRadius: 30,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 14,
    paddingBottom: 14,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 20,
    alignSelf: "center",
    height: 45,
    width: 200

  },
  textStyle1: {
    color: "#FFFF",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle2: {
    color: "#FF164B",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: '#FFFF',
    fontSize: 18,
    marginBottom: 20,
    padding: 10,
    textAlign: "center"
  }
});

// for redux
function mapStateToProps(state) {
  return { user : state.user }
}

function mapDispatchToProps(dispatch) {
  return {
    onReceiver: function(receiver) { 
      dispatch( {type: 'addReceiver', receiver }) 
    },
    onMatch: function(newMatch) { 
      dispatch( {type: 'addNewMatch', newMatch }) 
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MapScreen);