import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

/* Gradient Background Color Module */

export default function ContactsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View>
        <ListItem
          leftAvatar={{
            title: "NI",
            source: require("../assets/images/5.jpg"),
          }}
          title='Nicolas'
          subtitle='Nicolas'
          rightElement={<View style={{flexDirection: 'row'}}>
                          <TouchableOpacity>
                            <Image source={require('../assets/Logos/AcceptChatLogo.png')} style={styles.responseChat}></Image>
                          </TouchableOpacity>

                          <TouchableOpacity>
                            <Image source={require('../assets/Logos/RefuseChatLogo.png')} style={styles.responseChat}></Image>
                          </TouchableOpacity>
                        </View>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  responseChat: {
    width: 40,
    height: 40,
    
  }
});
