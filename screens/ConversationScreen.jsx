import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ListItem } from 'react-native-elements';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function ConversationScreen({navigation}) {
  return (
    <View style={styles.container}>
    <ListItem
      leftAvatar={{
        source: {uri : ("../assets/images/5.jpg")},
        showAccessory: true,
      }}
      title={"name"}
      subtitle={"role"}
      chevron
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
