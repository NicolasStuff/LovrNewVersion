import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function HomeScreen( {navigation} ) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF3C5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
