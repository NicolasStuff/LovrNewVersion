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

/* Galio Framework */
import { Block, Text, theme } from "galio-framework";

/* Links to components and constants folders */
import { Images } from "../constants";

/* Profile images slider box module */
import { SliderBox } from "react-native-image-slider-box";

/* Carousel for Instagram photos module */ 
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ViewPager from '@react-native-community/viewpager';

/* Responsive design for iOS and android devices */
const { width, height } = Dimensions.get("screen");

/* Instagram photos thumbnail */
const thumbMeasure = (width - 48 - 32) / 3;

import {connect} from 'react-redux';
import { database } from './firebase';


function ProfileScreen({navigation, user}) {
console.log("ProfileScreen -> user", user)

  const [images, setImages] = useState ([]);  
  const [myInfo, setMyInfo] = useState({})
  //const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    //take myinfo from users collection
    const takeMyInfoFirebase = async () => { 
      await database.ref('/users/'+ user).once('value', function(userSnap){
        let userInfo = userSnap.val()
        console.log("takeMyInfoFirebase -> userInfo", userInfo)

        //adding user info to states
        setMyInfo(userInfo)
        setImages(userInfo.photos)
      });
    }
    takeMyInfoFirebase()
    
  }, [])

  

  const _renderItem = ({ item }) => {
    return (
      <ViewPager style={styles.viewPager} initialPage={0}>
          <View key="1" row space="between">
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
                  {myInfo.first_name}, {myInfo.age}
                  </Text>
                  <Text light size={16} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                  Vit à : {myInfo.city}
                  </Text>
                  <Block middle style={{ marginTop: 10, marginBottom: 1 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <View style={{flex: 1, flexDirection: "row", marginHorizontal: 12, alignItems: 'center', marginVertical: 15}}>
                    <Image source={require('../assets/Logos/JobLogo.png')} style={{ width: 24, height: 21 }}/>
                    <Text light size={16} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                    {myInfo.job}
                    </Text>
                  </View>
                  <Block middle style={{ marginTop: 10, marginBottom: 1 }}>
                    <Block style={styles.divider} />
                  </Block>
              </Block>
              
              <Block middle style={{marginBottom: 20}}>
                  <Text size={16} color="#32325D" style={{ textAlign: "left",  marginTop: 10, marginHorizontal: 10 }}>
                    {myInfo.desc}
                  </Text>
              </Block>
              
              <View style={{flex:1, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                <TouchableOpacity
                          onPress={() => navigation.navigate('Settings')}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/SettingLogo.png')} style={{ width: 60, height: 60, marginRight: 70, borderRadius: 30 }}/>
                </TouchableOpacity>
                <TouchableOpacity
                          onPress={() => navigation.navigate('EditProfile')}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/EditLogo.png')} style={{ width: 60, height: 60, borderRadius: 30 }}/>
                </TouchableOpacity>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical:-10}}>
                <TouchableOpacity
                          onPress={() => navigation.navigate('Settings')}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/icon.png')} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 20, }}/>
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
//wrapper: {
  //height: 300
//},
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
}
});

// for redux
function mapStateToProps(state) {
  return { user : state.user }
}


export default connect(
  mapStateToProps, 
  null
)(ProfileScreen);