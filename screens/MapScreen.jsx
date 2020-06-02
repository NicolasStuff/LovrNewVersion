import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function MapScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
      <Button
        title="Go to Contacts"
        onPress={() => navigation.navigate('Contacts')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
