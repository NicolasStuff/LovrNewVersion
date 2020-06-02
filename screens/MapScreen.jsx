import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity ,Dimensions, mapCustom} from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen({navigation}) {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileLink}>
        <Image source={require('../assets/Logos/ProfileScreenLogo.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contacts')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/ChatScreenLogo.png')} />
      </TouchableOpacity>
      <MapView style={styles.mapStyle}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  profileLink: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 60,
    left: 0,
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  ChatLink: {
    zIndex: 9,
    position: 'absolute',
    flexDirection: 'row',
    marginTop: 60,
    right: 0,
    width: 100,
    height: 100,
    resizeMode: 'stretch',
  },
  radiusFour: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center'
},
  radiusThree: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center'
},
radiusTwo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center'
},
radius: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    overflow: "hidden",
    backgroundColor: 'rgba(135, 135, 135, 0.44)',
    alignItems: 'center',
    justifyContent: 'center'
},
marker: {
    height: 60,
    width: 60,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 60 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
  },
profileAndMessage: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    //  paddingTop: Constants.statusBarHeight
  },
pictureBox: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    overflow: 'hidden',
  }
});
