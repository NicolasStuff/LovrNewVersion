import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

/* Gradient Background Color Module */
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen( {navigation} ) {
  return (
    <View style={styles.container}>
    <LinearGradient
          colors={['rgba(255,177,153,1)', 'rgba(255,8,68,1)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 1000,
          }}
        />
      <Text>HomeScreen</Text>
      <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Settings', { name: 'Jane' })
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
