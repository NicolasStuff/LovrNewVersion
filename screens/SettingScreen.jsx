import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Switch } from 'react-native';

export default function SettingScreen({navigation}) {

  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState2 => !previousState2);

  const Logout = () => {
    auth.signOut()
  }

  return (
    <View>
      <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/Logos/BackLogoFromChatRequets.png')} style={{width: 75, height: 50}}></Image>
      </TouchableOpacity>
      <View style={styles.container}>
        <Image source={require('../assets/Logos/Logo-Maquette.png')} style={styles.LogoLovr}></Image>
      </View>
      <Text style={styles.ShowMe}>Montrez-moi !</Text>
      <View style={{margin: 20, padding: 20, backgroundColor: "white"}}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.Attract}>Homme</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10}}>
          <Text style={styles.Attract}>Femme</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled2}
          />
        </View>
      </View>
      <View style={{margin: 20, padding: 20, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity >
          <Text style={styles.OthersSettings} > Contact / Assistance </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin: 20, padding: 20, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity 
          onPress={()=> Logout()}
        >
          <Text style={styles.OthersSettings} > Se Déconnecter </Text>
        </TouchableOpacity>
      </View>
      <View style={{margin: 20, padding: 20, backgroundColor: "white", alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity >
          <Text style={styles.OthersSettings} > Supprimer mon compte </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity >
          <Text style={styles.legalMentions} > Mentions légales </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  ShowMe: {
    marginTop: 150,
    marginLeft: 30,
    fontSize: 18,
    color: "#707070",
  },
  OthersSettings: {
    fontSize: 18,
    color: "#707070",
  },
  legalMentions: {
    fontSize: 15,
    color: "#707070",
  },
  Attract: {
    fontSize: 18,
    color: "#707070",
  },
  BackButton: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 60,
    left: 0,
  },
  LogoLovr: {
    marginTop: 60,
    width: 80,
    height: 60,
  }
});
