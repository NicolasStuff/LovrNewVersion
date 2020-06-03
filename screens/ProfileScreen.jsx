import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  TouchableOpacity
} from "react-native";

/* Galio Framework */
import { Block, Text, theme } from "galio-framework";

/* Links to components and constants folders */
import { Button } from "../components";
import { Images } from "../constants";
import { HeaderHeight } from "../constants/utils";

/* Profile images slider box module */
import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;


  export default function ProfileScreen({navigation}) {
     const [images, setImages] = useState ([
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
    ])   
  
 return (
  
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/ChatScreenLogo.png')} style={{width: 75, height: 50}}/>
    </TouchableOpacity>
            
    <Block style={styles.profile}>
        <ImageBackground
            style={styles.profileContainer}>
          <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width }}>
            <SliderBox
              images={images}
              sliderBoxHeight={400}
              onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
              dotColor="#FF164B"
              inactiveDotColor="#90A4AE"
            />
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D" style={{ textAlign: "left", marginTop: 10, marginHorizontal: 10 }}>
                  Marie, 22
                </Text>
                <Text size={16} color="#32325D" style={{ textAlign: "left", marginTop: 10, marginHorizontal: 10 }}>
                  Vit à : Paris
                </Text>
                <Text size={16} color="#32325D" style={{ textAlign: "left", marginTop: 10, marginHorizontal: 10 }}>
                Photographe
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 1 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>
                <Text
                  size={16}
                  color="#525F7F"
                  style={{ textAlign: "left",  marginTop: 10, marginHorizontal: 10 }}
                >
                  Salut, Je suis Marie j'habite à Paris et je suis dispo pour aller boire un verre et rencontrer de nouvelles têtes!
                </Text>
                <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        style={styles.button}>
                        <Text style={{color: "#5E72E4", fontSize: 16}}>Show more</Text>
                      </TouchableOpacity>
                </Block>
                <Block
                      row
                      style={{ paddingBottom: 10, justifyContent: "flex-start" }}
                    >
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        style={styles.button}>
                        <Text style={{color: "#5E72E4", fontSize: 8}}>27 photos Instagram</Text>
                      </TouchableOpacity>
                    </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2, marginHorizontal: 10 }}>
                <Block row space="between" style={{ flexWrap: "wrap" }}>
                  {Images.Viewed.map((img, imgIndex) => (
                    <Image
                      source={{ uri: img }}
                      key={`viewed-${img}`}
                      resizeMode="cover"
                      style={styles.thumb}
                    />
                  ))}
                </Block>
              </Block>
          </ScrollView>
      </ImageBackground>
    </Block>
        
    </View>
  );
}


const styles = StyleSheet.create({
profile: {
  flex: 1,
},
profileContainer: {
  width: width,
  height: height,
  padding: 0,
  zIndex: 1
},
profileCard: {
  position: "relative",
  borderTopLeftRadius: 6,
  borderTopRightRadius: 6,
  backgroundColor: theme.COLORS.WHITE,
  shadowColor: "black",
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 8,
  shadowOpacity: 0.2,
  zIndex: 2
},
info: {
  paddingHorizontal: 40
},
avatarContainer: {
  position: "relative",
  marginTop: -80
},
avatar: {
  width: 124,
  height: 124,
  borderRadius: 0,
  borderWidth: 0
},
button: {
  alignItems: "center",
  backgroundColor: "transparent",
  padding: 10
},
nameInfo: {
  marginTop: 35,
  alignItems: 'flex-start'
},
divider: {
  width: "90%",
  borderWidth: 1,
  borderColor: "#E9ECEF"
},
thumb: {
  borderRadius: 4,
  marginVertical: 4,
  alignSelf: "center",
  width: thumbMeasure,
  height: thumbMeasure
},
profileLink: {
  zIndex: 9,
  position: 'absolute',
  flexDirection: 'row',
  marginTop: 60,
  left: 0,
},
ChatLink: {
  zIndex: 9,
  position: 'absolute',
  flexDirection: 'row',
  marginTop: 60,
  right: 0,
}
});

