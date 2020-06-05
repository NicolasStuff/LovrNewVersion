import React, {useState} from 'react';
import styles from '../assets/styles';

import { View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';

/* Galio Framework */
import { Block, Text } from "galio-framework";

export default function MyChatScreen ({navigation}) {

    const [images, setImages] = useState ([
        "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80"]);
    
    const [name, setName] = useState ("Marie");

    const [lastMessage, setLastMessage] = useState ("Hi you");

    const [value, onChangeText] = React.useState('');

    const [valueClear, onClearText] = React.useState('');

    return (
    
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.profileLink}>
                <Image source={require('../assets/Logos/MapScreenLogoFromChat.png')} style={{width: 75, height: 50}} />
            </TouchableOpacity>
    
        <Block style={styles.profile}>
    
            <ImageBackground
                style={styles.profileContainer}>
          
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}>
        
        <View style={styles.searchContainer}>
            <SearchBar
                lightTheme
                onChangeText={text => onChangeText(text)}
                onClearText={text => onClearText(text)}
                icon={{ type: 'font-awesome', name: 'search'}}
                placeholder='Rechercher'
                placeholderTextColor='#FF3C5E' 
                value={value}
                onSearch={value => console.log(value)}
            />
        </View>

        <View style={styles.containerMessage}>
            <Image source={images} style={styles.avatar}/>
        <View style={styles.content}>
            <Text>{name}</Text>
            <Text style={styles.message}>{lastMessage}</Text>
        </View>
        </View>

    </ScrollView>
    </ImageBackground>
    
    </Block>    
</View>
  );
};
