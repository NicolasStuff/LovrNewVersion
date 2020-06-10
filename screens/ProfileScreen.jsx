import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert, 
  Modal,
  TextInput,
} from "react-native";

/* Social Icon Module for Instagram API */
import { SocialIcon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 

/* Galio Framework */
import { Block, Text, theme } from "galio-framework";

/* Links to components and constants folders */
import { Images } from "../constants";

/* Profile images slider box module */
import { SliderBox } from "react-native-image-slider-box";

/* Carousel for Instagram photos module */ 
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ViewPager from '@react-native-community/viewpager';
import { logInAsync } from 'expo-google-app-auth';

/* Responsive design for iOS and android devices */
const { width, height } = Dimensions.get("screen");

/* Instagram photos thumbnail */
const thumbMeasure = (width - 46 - 30) / 3;

import {connect} from 'react-redux';
import { database } from './firebase';

function ProfileScreen({navigation, receiver, user}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");  
  
  const [count, setCount] = useState(0);
  
  const [selectUser, setSelectUser] = useState({})
  const [images, setImages] = useState ([]);  
  
  const [sliderImg, setSliderImg] = useState ([
    'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1503642551022-c011aafb3c88?fit=crop&w=240&q=80',
    'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=240&q=80',
  ])
  
  useEffect(() => {
    //for take useer info from users collection
    const takeUserInfoFirebase = async () => { 
      await database.ref('/users/'+ receiver).once('value', function(userSnap){
        let userInfo = userSnap.val()

        //adding user photos
        setSelectUser(userInfo)
        setImages(userInfo.photos)
      });
    }
    takeUserInfoFirebase()
    
  }, [])

    const _renderItem = ({ item, index }) => {
      return (
        <ViewPager style={styles.viewPager} initialPage={0}>
            <View key="1" style={{ flex: 1, flexWrap: 'wrap', flexDirection:'row', justifyContent:'space-between'}}>
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
  
    const chatRequest = () => {
      //send request to firebase
      database.ref('chatRequest/' + receiver + '/' + user).set({
        createdAt: Date.now(),
        content: text
      })    
      setModalVisible(!modalVisible)
      navigation.navigate('Map')
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
                  {selectUser.first_name}, 22
                  </Text>
                  <Text light size={16} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                  Vit à : {selectUser.city}
                  </Text>
                  <Block middle style={{ marginTop: 10, marginBottom: 1 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <View style={{flex: 1, flexDirection: "row", marginHorizontal: 12, alignItems: 'center', marginVertical: 15}}>
                    <Image source={require('../assets/Logos/JobLogo.png')} style={{ width: 24, height: 21 }}/>
                    <Text light size={16} color="#363636" style={{ textAlign: "left", marginHorizontal: 10 }}>
                    {selectUser.job}
                    </Text>
                  </View>
                  <Block middle style={{ marginTop: 10, marginBottom: 1 }}>
                    <Block style={styles.divider} />
                  </Block>
              </Block>
              
              
              
              <Block middle style={{marginBottom: 20}}>
                  <Text size={16} color="#32325D" style={{ textAlign: "left",  marginTop: 10, marginHorizontal: 10 }}>
                  {selectUser.desc}
                  {/* Salut, Je suis Marie j'habite à Paris et je suis dispo pour aller boire un verre et rencontrer de nouvelles têtes! */}
                  </Text>
              </Block>

              {/* Instagram Basic Display API */}
              <Text size={10} style={{ textAlign: "left",  marginTop: 10, marginHorizontal: 18, marginBottom: 10 }}>{setCount} photos Instagram</Text>
         

              <View style={styles.wrapper}>
                  <Carousel 
                      data={sliderImg}
                      renderItem={_renderItem}
                      onSnapToItem={(index) => setActiveSlide ({activeSlide: index})}
                      sliderWidth={width}
                      itemWidth={width - 70}
                      enableMomentum={false}
                      //lockScrollWhileSnapping
                      //autoplay
                      //loop
                      //autoplayInterval={3000}
                  />
              </View>
              
              <View style={{flex:1, flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginBottom: 40}}>
                <TouchableOpacity
                          onPress={() => navigation.navigate('Settings')}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/SignalLogo.png')} style={{ width: 60, height: 60 }}/>
                </TouchableOpacity>
                <TouchableOpacity
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}
                          style={styles.button}>
                          <Image source={require('../assets/Logos/AskForChatLogo.png')} style={{ width: 60, height: 60 }}/>
                </TouchableOpacity>
                <View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                      // () => {Alert.alert("Become Lovable has been closed.")}}
                    >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        {/* Inside my modal */}
                        <View>
                          <Image source={{ uri: selectUser.avatar }} style={styles.imageCenter}></Image>
                          <Image source={require('../assets/Logos/icon.png')} style={styles.logo}></Image>
                        </View>
                        <Text style={{marginTop: 45, textAlign: 'center', fontSize: 25,}}>Tente ta chance, {'\n'} envoies lui un message</Text>

                        <View style={styles.footer}>
                          <TextInput
                            value={text}
                            onChangeText={text => setText(text)}
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Ecrire un message"
                            placeholderTextColor='rgba(255, 28, 78, 0.34)'
                          />
                          <TouchableOpacity onPress= { () => chatRequest() }>
                            <Ionicons name="md-send" size={25} color="black" style={styles.send}/>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                </View>
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
centeredView: {
  zIndex: 1,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
modalView: {
  zIndex: 1,
  flex: 1,
  height: 600,
  width: 300,
  borderRadius: 20,
  overflow: 'hidden',
  padding: 2,
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
},
imageCenter: {
  width: 140,
  height: 140,
  borderRadius: 70,
},
logo: {
  width: 30,
  height: 30,
  borderRadius: 70,
  position: 'absolute',
  left: 55,
  bottom:-13,
},
slideImg: {
  flex: 1,
  height: "100%",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},
footer: {
  marginTop: 50,
  margin:10,
  flexDirection: 'row',
  backgroundColor: 'white',
  borderColor: '#FF1C4E',
  borderWidth: 1,
  borderRadius: 25,
},
input: {
  flex: 1,
  paddingHorizontal: 20,
  paddingVertical: 10,
  fontSize: 18,
},
send: {
  alignSelf: 'center',
  color: '#FF1C4E',
  padding: 20,
},
});

//for redux
function mapStateToProps(state) {
  return { receiver : state.receiver, user : state.user }
}

export default connect(
  mapStateToProps, 
  null
)(ProfileScreen);