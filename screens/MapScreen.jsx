import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions, mapCustom} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { database } from './firebase';
const geofire = require('geofire');
import {connect} from 'react-redux';

function MapScreen({navigation, user}) {
  const [mapRegion, setMapRegion] = useState({ latitude: 48.8534, longitude: 2.3488, latitudeDelta: 0.0922, longitudeDelta: 0.0421})
  const [location, setLocation] = useState({coords: { latitude: 48.8534, longitude: 2.3488}})  
  const [nearbyUsers, setNearbyUsers] = useState([]);
                                              
  
  useEffect(() => {
    const _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        // some code here
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation( location );

      //creating document in firebase with GeoFire
      let locationArray = [location.coords.latitude, location.coords.longitude]
      let fireRef = database.ref('usersPosition')
      let geoFireInstance = new geofire.GeoFire(fireRef);
      
      geoFireInstance.set(user, locationArray)
        .then(console.log('location saved'))
        .catch(err => console.log('err =>', err));       
    };
    _getLocationAsync();

    //ref for GeoFire
    let fireRef = database.ref('usersPosition')
    let geoFireInstance = new geofire.GeoFire(fireRef);

    let geoQuery = geoFireInstance.query({
      //change for user location
      center: [48.79098, 2.39717],
      radius: 5
    }); 
    const addQueryListenner = () =>{
      console.log('inside addQueryListenner')
      let nearbyUsersArray = [];
      let firsTime = true;
      
      // geoquery listeners
      geoQuery.on('key_entered', function(key, location, distance) {
        console.log("inside user", key)
        
        let objectIndex = nearbyUsersArray.findIndex(obj => {obj.id === key})
        // for first time
        if(firsTime && objectIndex === -1){
            let userToPush = {id : key, coords: {latitude: location[0], longitude: location[1]}}
            // , latitudeDelta: 0.0922, longitudeDelta: 0.0421
            nearbyUsersArray.push(userToPush)          
        }
        //adding new users
        if(!firsTime && objectIndex === -1){
          let userToPush = {id : key, coords: {latitude: location[0], longitude: location[1]}}
          nearbyUsersArray.push(userToPush)
          setNearbyUsers(nearbyUsersArray)
          console.log("addQueryListenner -> nearbyUsersArray", nearbyUsersArray)
        }
      })    

      geoQuery.on("key_exited", function(key, location, distance) {
        console.log('user go out', key)
        // removing user from state
        nearbyUsersArray.splice(nearbyUsersArray.findIndex(obj => {obj.id === key}),1)        
        setNearbyUsers(nearbyUsersArray)        
        console.log("addQueryListenner -> nearbyUsersArray", nearbyUsersArray)
      });

      geoQuery.on("ready", function() {
        console.log('all nearby users taken from frirebase');
        setNearbyUsers(nearbyUsersArray)
        firsTime = false;
        console.log("addQueryListenner -> nearbyUsersArray", nearbyUsersArray)
      })

    }
    addQueryListenner()
    
    return () => {
      // detaching listener
      geoQuery.cancel();
    };
  }, []);
   
  // just for testing => delete
  // const addingFakePositionToFirebase = () => {
  //   let fireRef = database.ref('usersPosition')
  //   for (let i=0; i<fakeUsers.length; i++){
  //     let locationArray = [fakeUsers[i].latitude, fakeUsers[i].longitude]
  //     let geoFireInstance = new geofire.GeoFire(fireRef);
  //     geoFireInstance.set("userId"+i, locationArray).then(console.log('location saved')).catch(err => console.log('err =>', err))
  //   }
  // }

    
  const _handleMapRegionChange = mapRegion => {
    setMapRegion({ mapRegion });
  };

  //creating markers
  var NewUsers = 
    nearbyUsers.map((user,i) => {
      if(user.coords != null){
        return (
          <Marker
            style={styles.FrontMarker}
            key={i}
            coordinate={user.coords}
            anchor={{x: 0.5, y: 0.5}}>
                
              <View style={styles.marker}>
                  <Image source={ require('../assets/images/5.jpg')} style={styles.pictureBox}/>
              </View>
          </Marker>
         )
      }
    })
     
      // console.log(location)

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileLink}>
        <Image source={require('../assets/Logos/ProfileScreenLogo.png')} style={{width: 75, height: 50}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/ChatScreenLogo.png')} style={{width: 75, height: 50}}/>
      </TouchableOpacity>
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
                                  <Image source={ require('../assets/images/5.jpg')} style={styles.pictureBox}/>
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