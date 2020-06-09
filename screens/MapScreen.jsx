import React, { Component, useEffect, useState} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TouchableHighlight , Dimensions, mapCustom, Alert, Modal, Text, Block } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { database } from './firebase';
const geofire = require('geofire');
import {connect} from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

function MapScreen({navigation, user}) {
  const [mapRegion, setMapRegion] = useState({ latitude: 48.8534, longitude: 2.3488, latitudeDelta: 0.0922, longitudeDelta: 0.0421})
  const [location, setLocation] = useState({coords: { latitude: 48.8534, longitude: 2.3488}})  
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);                                              
  
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
        radius: 5
      }); 

      var nearbyUsersArray = [];
      let firsTime = true;

      // geoquery listeners
      geoQuery.on('key_entered', function(key, location, distance) {
        console.log("inside user", key)
        
        let objectIndex = nearbyUsersArray.findIndex(obj => {obj.id === key})
        
        // for first time
        if(firsTime && objectIndex === -1){
          let userToPush = {id : key, avatar: null, coords: {latitude: location[0], longitude: location[1]}}
          nearbyUsersArray.push(userToPush)            
        }
        
        //adding new users to state
        if(!firsTime && objectIndex === -1){   
          newNearbyUser(key, location)
        }
      })    
      
      geoQuery.on("key_exited", function(key) {
        console.log('user go out', key)
        // removing user from state
        var usersCopy = [...nearbyUsers]
        var filteredUsers = usersCopy.filter(obj => obj.id != key)
        setNearbyUsers(filteredUsers)        
      });
  
      geoQuery.on("ready", function() {
        console.log('all nearby users taken from frirebase');
        updateUsersState(nearbyUsersArray)
        firsTime = false;
      })

    };
    _getLocationAsync();
    
    return () => {
      // detaching listener
      let geoQuery = geoFireInstance.query({
        center: [location.coords.latitude, location.coords.longitude],
        radius: 5
      });
      geoQuery.cancel();
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

  //to set state of neraby users after first time
  const newNearbyUser = async (user, location) => {
    let usersCopy = [...nearbyUsers];
    let avatarNewUser = await database.ref('/users/'+ user + '/avatar').once('value')
    let userToPush = {id : user, avatar: avatarNewUser.val(), coords: {latitude: location[0], longitude: location[1]}};
    usersCopy.push(userToPush)
    setNearbyUsers(usersCopy)
  }

  const _handleMapRegionChange = mapRegion => {
    setMapRegion({ mapRegion });
  };

  //creating markers
  var NewUsers = 
    nearbyUsers.map((user,i) => {
      if(user.coords != null){
        return (
          <Marker
            onPress={()=>{Alert.alert('send to user profile id: ' + user.id)}}
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
    })
     

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileLink}>
        <Image source={require('../assets/Logos/ProfileScreenLogo.png')} style={{width: 75, height: 50}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/ChatScreenLogo.png')} style={{width: 75, height: 50}}/>
      </TouchableOpacity>
      <TouchableHighlight
        style={styles.openButton2}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle1}>Devenir LOVABLE</Text>
      </TouchableHighlight>
    <View style={styles.centeredView}>
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

            <TouchableHighlight
              style={styles.openButton1}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle2}>Continuer</Text>
            </TouchableHighlight>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      
    </View>   

      <MapView style={styles.mapStyle}
      region = { { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } }
      showsUserLocation = { false }
      minZoomLevel={12}
      maxZoomLevel={19}
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
                                  {/* <Image source={ require('../assets/images/5.jpg')} style={styles.pictureBox}/> */}
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
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 400,
    marginBottom: 100,
    marginHorizontal: 100,
    marginVertical: 100,
    marginRight: 80
  },
  modalView: {
    zIndex: 1,
    position: 'relative',
    height: 300,
    width: 300,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton1: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    padding: 10,
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
    backgroundColor: "#36B547",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 100,
    alignSelf: "center"
  },
  textStyle1: {
    color: "#FFFF",
    fontWeight: "bold",
    textAlign: "center"
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

export default connect(
  mapStateToProps, 
  null
)(MapScreen);