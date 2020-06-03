import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions, mapCustom} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function MapScreen({navigation}) {
  const [mapRegion, setMapRegion] = useState({ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421, })
  const [location, setLocation] = useState({coords: { latitude: 37.78825, longitude: -122.4324}})
  const [fakeUsers, setFakeUsers] = useState([{ latitude: 49.125971, longitude: 2.228506, latitudeDelta: 0.0922, longitudeDelta: 0.0421, },
                                              { latitude: 49.129971, longitude: 2.228, latitudeDelta: 0.0922, longitudeDelta: 0.0421, },
                                              { latitude: 49.222, longitude: 2.228, latitudeDelta: 0.0922, longitudeDelta: 0.0421, },
                                              { latitude: 49.12, longitude: 2.22, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }])
  
useEffect(() => {
    _getLocationAsync();
  }, []);

  const _handleMapRegionChange = mapRegion => {
    setMapRegion({ mapRegion });
  };

  const _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      
    }
    
    let location = await Location.getCurrentPositionAsync({});
    setLocation( location );
  };

  var NewUsers = 
    fakeUsers.map((user,i) => {
        return (
        <Marker
          style={styles.FrontMarker}
          key={i}
          coordinate={ user }
          anchor={{x: 0.5, y: 0.5}}>
              
            <View style={styles.marker}>
                <Image source={ require('../assets/images/5.jpg')} style={styles.pictureBox}/>
            </View>
        </Marker>
         )
        }
      )
     
      console.log(location)

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileLink}>
        <Image source={require('../assets/Logos/ProfileScreenLogo.png')} style={{width: 75, height: 50}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contacts')} style={styles.ChatLink}>
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
