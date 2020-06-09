import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function ConversationScreen({navigation}) {
  var name = ['Elodie','Elodie','Elodie','Elodie','Elodie',]
  return (
    <View style={styles.container}>
    <ListItem
      leftAvatar={{
        title: "NI",
        source: require("../assets/images/5.jpg"),
      }}
      title='Nicolas'
      subtitle='Nicolas'
      chevron
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
