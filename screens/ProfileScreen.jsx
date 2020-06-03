import React, {Component} from 'react';
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

//export default function ProfileScreen({navigation}) {     

  export default class ProfileScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        images: [
          "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
          "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
          "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
          "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80"
        ]
      };
    }
  
    render() {
 return (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.profileLink}>
        <Image source={require('../assets/Logos/ProfileScreenLogo.png')} style={{width: 75, height: 50}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/ChatScreenLogo.png')} style={{width: 75, height: 50}}/>
      </TouchableOpacity>
  <Block flex style={styles.profile}>
  <Block flex>
  <ImageBackground
            source={{uri: Images.Profile}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width, marginTop: '25%' }}
      >
       <SliderBox
  images={this.state.images}
  sliderBoxHeight={400}
  onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  dotColor="#FF164B"
  inactiveDotColor="#90A4AE"
/>
        <Block flex style={styles.profileCard}>    
          <Block flex>
            <Block middle style={styles.nameInfo}>
              <Text bold size={28} color="#32325D">
                Marie, 22
              </Text>
              <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                Vit à : Paris
              </Text>
              <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                Photographe
              </Text>
            </Block>
            <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
              <Block style={styles.divider} />
            </Block>
            <Block middle>
              <Text
                size={16}
                color="#525F7F"
                style={{ textAlign: "center" }}
              >
                Salut, Je suis Marie j'habite à Paris et je suis dispo pour aller boire un verre et rencontrer de nouvelles têtes!
              </Text>
              <Button
                color="transparent"
                shadowless
                overflow="hidden"
                textStyle={{
                  color: "#233DD2",
                  fontWeight: "500",
                  fontSize: 16
                }}
              >
                Show more
              </Button>
              <Block
                    row
                    style={{ paddingBottom: 20, justifyContent: "flex-end" }}
                  >
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#5E72E4", fontSize: 8 }}
                    >
                      27 photos Instagram
                    </Button>
                  </Block>
              <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
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
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </ImageBackground>
  </Block>
  {
    }
    </Block>
    </View>
  );
}
  }

const styles = StyleSheet.create({
profile: {
  marginTop: Platform.OS === "android" ? -HeaderHeight : 2,
  marginBottom: -HeaderHeight * 2,
  flex: 1
},
profileContainer: {
  width: width,
  height: height,
  padding: 0,
  zIndex: 1
},
profileBackground: {
  width: width,
  height: height / 2
},
profileCard: {
  position: "relative",
  padding: theme.SIZES.BASE,
  marginHorizontal: theme.SIZES.BASE,
  marginTop: 65,
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
nameInfo: {
  marginTop: 35
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

