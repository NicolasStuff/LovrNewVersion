import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen({navigation}) {
  return (
    <View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')} style={styles.profileLink}>
        <Image source={require('../img/ProfileLogoFromMaps.png')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactsScreen')} style={styles.ChatLink}>
        <Image source={require('../img/ConversationLogoFromMap.png')} />
      </TouchableOpacity>
      <MapView style={{flex : 1}}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
