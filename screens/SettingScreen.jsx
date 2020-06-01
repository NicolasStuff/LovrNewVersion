import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>SettingScreen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
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
