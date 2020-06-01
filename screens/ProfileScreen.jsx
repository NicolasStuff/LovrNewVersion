import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

/* galio framework module */
import { Card, theme, withGalio, GalioProvider } from 'galio-framework';

function SettingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}
            title="Christopher Moon"
            caption="139 minutes ago"
            location="Los Angeles, CA"
            avatar="http://i.pravatar.cc/100?id=skater"
            imageStyle={styles.cardImageRadius}
            imageBlockStyle={{ padding: theme.SIZES.BASE / 2 }}
            image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
    />
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = theme => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.COLORS.FACEBOOK,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  export default withGalio(SettingScreen, styles);
  
