import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";

import { SocialIcon } from 'react-native-elements';

import InstagramLogin from 'react-instagram-login';

/* Galio Framework */
import { Block, Text, theme } from "galio-framework";

/* Links to components and constants folders */
import { Images } from "../constants";

/* Profile images slider box module */
import { SliderBox } from "react-native-image-slider-box";

/* Carousel for Instagram photos module */ 
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ViewPager from '@react-native-community/viewpager';

/* Responsive design for iOS and android devices */
const { width, height } = Dimensions.get("screen");

/* Instagram photos thumbnail */
const thumbMeasure = (width - 48 - 32) / 3;

  export default function ProfileScreen({navigation}) {

  //const [count, setCount] = useState(0);

     const [images, setImages] = useState ([
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
      "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80",
    ])   

    const [sliderImg, setSliderImg] = useState ([
      'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1503642551022-c011aafb3c88?fit=crop&w=240&q=80',
      'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=240&q=80',
    ])

    const _renderItem = ({ item, index }) => {
      return (
        <ViewPager style={styles.viewPager} initialPage={0}>
            <View key="1" row space="between" style={{ flexWrap: "wrap" }}>
                {Images.Viewed.map((img, imgIndex) => (
                  <Image
                    source={{ uri: img }}
                    key={`viewed-${img}`}
                    resizeMode="cover"
                    style={styles.thumb}
                  />
                ))}
              </View>
        </ViewPager>
      );
    };

    const [activeSlide, setActiveSlide] = useState(0);

    const _renderEntry = ({ entries }) => {
      return (
        <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
            // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />  
      )
    }

      async function logIn() {
        try {
          await Instagram.initializeAsync('3002863106448794');
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Instagram.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name and media access using Instagram's Basic display API
            //setConnected = true;
            const Instagramresponse = await fetch(`https://graph.instagram.com/me?access_token=${token}`);
    
            const credential = authF.InstagramAuthProvider.credential(token);
            
            auth.signInWithCredential(credential).then((user)=>{
              //testing if is a new user
              if(user.additionalUserInfo.isNewUser === true) {
                //creating user profile in firebase
                database.ref('users/' + user.user.uid).set({
                  uid: user.user.uid,
                  createdAt: Date.now(),
                  active: true,
                  photos: ['photo1', 'photo2', 'photo3'], 
               })
              }
            }).catch((err)=>{
              console.log('error de la muerte', err)
            });
            // navigation.navigate('Map')
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Instagram Login Error: ${message}`);
        }
      }
      
  
 return (
  
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Map')} style={styles.ChatLink}>
        <Image source={require('../assets/Logos/MapScreenLogoFromProfile.png')} style={{width: 75, height: 50}}/>
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
              dotColor="rgba(212, 212, 212, 0.70)"
              inactiveDotColor="rgba(81, 81, 81, 0.70)"
            />

<Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                  Marie, 22
                  </Text>
                  <Text light size={16} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                  Vit à : Paris
                  </Text>
                  <Block middle style={{ marginTop: 10, marginBottom: 1 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <View style={{flex: 1, flexDirection: "row", marginHorizontal: 12, alignItems: 'center', marginVertical: 15}}>
                    <Image source={require('../assets/Logos/JobLogo.png')} style={{ width: 24, height: 21 }}/>
                    <Text light size={16} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                    Photographe
                    </Text>
                  </View>
                  <Block middle style={{ marginTop: 10, marginBottom: 1 }}>
                    <Block style={styles.divider} />
                  </Block>
              </Block>
              
              
              
              <Block middle style={{marginBottom: 20}}>
                  <Text size={16} color="#32325D" style={{ textAlign: "left",  marginTop: 10, marginHorizontal: 10 }}>
                  Salut, Je suis Marie j'habite à Paris et je suis dispo pour aller boire un verre et rencontrer de nouvelles têtes!
                  </Text>
              </Block>

              {/* Instagram Basic Display API */}
              <SocialIcon
                title='Se connecter avec Instagram'
                onPress={
                  () => logIn()
                }
                button
                type=''
                style={styles.signInFacebook}
              />

              

              <View style={styles.wrapper}>
                  <Carousel 
                      data={sliderImg}
                      renderItem={_renderItem}
                      onSnapToItem={(index) => setActiveSlide ({activeSlide: index})}
                      sliderWidth={width}
                      itemWidth={width - 70}
                      enableMomentum={false}
                      renderEntry={_renderEntry}
                      //lockScrollWhileSnapping
                      //autoplay
                      //loop
                      //autoplayInterval={3000}
                  />
              </View>
              
              <View style={{flex:1, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                <TouchableOpacity
                          onPress={() => navigation.navigate('Settings')}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/SignalLogo.png')} style={{ width: 60, height: 60 }}/>
                </TouchableOpacity>
                <TouchableOpacity
                          onPress={() => navigation.navigate('Chat')}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/AskForChatLogo.png')} style={{ width: 60, height: 60 }}/>
                </TouchableOpacity>
              </View>
        </ScrollView>
      </ImageBackground>
    </Block>    

  </View>
  );
}


const styles = StyleSheet.create({
profile: {
  flex: 1
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
container: {
  alignItems: 'center'
},
button: {
  alignItems: "center",
  backgroundColor: "transparent",
  padding: 10
},
nameInfo: {
  marginTop: 25,
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
},
viewPager: {
  flex: 1,
},
wrapper: {
  height: 300
},
slide: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#ffff"
},
slideImg: {
  flex: 1,
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center"
},
signInFacebook: {
  width: 250,
  height: 60,
  fontSize: 15,
  backgroundColor: '#4267B2',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5
}
});
