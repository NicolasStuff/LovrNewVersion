import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, Dimensions, View, Image, TouchableOpacity, TextInput, Animated} from 'react-native';
import firebase from 'firebase';
import {ActionSheet, Root} from 'native-base';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

const height = Dimensions.get('screen').height;

export default function EditProfile ({navigation, props}) {
  
  const [name, setName] = useState(null)
  const [fileList, setFileList] = useState([ { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' } ])
  const [urlArray, setUrlArray] = useState([])
  
  var draggedValue = new Animated.Value(180);


    useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  var onSelectedImage = (image) => {
    //console.log("resulat recu", image)
    let newDataImg = [...fileList];
    const source = {uri: image.uri};
    let item = {
      id: Date.now(),
      uri: source.uri,
      //content: image.data
    };
    //console.log("mon item",item)
    newDataImg.unshift(item);
    //urlArray.unshift(image.uri);
    newDataImg[10] != item ? newDataImg.pop() : null
    console.log("my new Data",newDataImg);
    setFileList(newDataImg)
    //for (var i=0; i<urlArray.length; i++){
    //  storeInCloud(urlArray[i], i)
    //}
  }
  //console.log("contenu defileList",fileList)

  var takePhotoFromCamera = () => {
    //console.log("je suis passer")
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      onSelectedImage(image);
      //console.log(image);
    });
  };

  var ChoosePhotofromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      })
      
      //console.log('mon resultat',result);
  
      if (!result.cancelled) {
        onSelectedImage(result);
        //setImage(result.uri);
      }
  };

  var onClickAddImage = () => {
    const BUTTONS = ['Prendre un photo', 'Choisir une photo depuis la gallerie', 'Annuler'];
    ActionSheet.show(
      {options: BUTTONS,
      cancelButtonIndex: 2,
      title: 'Selectionner une photo'},
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
              console.log("coucou")
            takePhotoFromCamera();
            break;
          case 1:
            ChoosePhotofromLibrary();
            break;
          default:
            break;
        }
      })
    };

    var cleanupSingleImage = (index) => {
      //console.log("id",id)
        var iList = [...fileList]
        iList.splice(index, 1);
        console.log("contenu de iList", iList)
        iList.push({ uri: 'j'});
        setFileList(iList)
    }

    console.log('my filelist',fileList)
    return (
        <Root>
            <View>
              <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../assets/Logos/BackLogoFromChatRequets.png')} style={{width: 75, height: 50}}></Image>
              </TouchableOpacity>
                
                <FlatList
                  onEndReachedThreshold={0}
                  contentContainerStyle={styles.list}
                  data= {fileList}
                  renderItem={({ item, index }) => {
                    
                    return (
                          
                          <View>
                            <Image source={{uri : item.uri}} style={styles.item}/>
                            { item.uri != 'a' && item.uri != 'j' ? (
                             <TouchableOpacity onPress={() => cleanupSingleImage(index)} style={styles.deleteButton}>
                                 <Image source={require("../assets/Logos/DeleteButtonEditProfile.png")} style={styles.deleteButtonImage}></Image>
                             </TouchableOpacity>
                             ) : (
                             <TouchableOpacity
                               disabled={true}/>
                             )}
                          </View>
                      )}
                    }
                    
                  keyExtractor={(item, index) => index}
                  //extraData={{fileList}}
                  >
                </FlatList>
                
                <SlidingUpPanel 
                ref={c => _panel = c}
                draggableRange={{top: height / 2.5, bottom: 10}}
                animatedValue={draggedValue}>
                  <View style={styles.container}>
                    <TouchableOpacity onPress={() => _panel.hide()} style={styles.RectangleBox}>
                      <Image source={require('../assets/Logos/RectangleSlidingPanel.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClickAddImage} style={styles.CameraBox}>
                      <Image source={require('../assets/Logos/AddPictureLogo.png')} style={styles.Camera}/>
                    </TouchableOpacity>

                    <Text style={styles.ProfileName}>{name}, 22</Text>
                    <Text style={styles.AboutMe}>A Propos de {name}</Text>
                    <TextInput
                      style={styles.DescriptionTextBox}
                      placeholder={'  N\'\hésites pas'}/>
                    <Text style={styles.Job}>Job et études</Text>
                    <TextInput
                      style={styles.JobTextBox}
                      placeholder={'  Poste'}/>
                    <TouchableOpacity style={styles.LovrButton} onPress={ () => {}}>
                      <Text style={styles.TextButton}>Obtenir Lovr+</Text>
                    </TouchableOpacity>
                  </View>
                </SlidingUpPanel>
            </View>
        </Root>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    backgroundColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  RectangleBox: {
    position: 'absolute',
    top: 10,
  },
  ProfileName: {
    position: "absolute",
    fontWeight: '900',
    fontSize: 30,
    paddingBottom: 580,
    left: 20
  },
  AboutMe: {
    position: "absolute",
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 510,
    left: 20
  },
  DescriptionTextBox: {
    position: "absolute",
    width: Dimensions.get('screen').width,
    height: 80,
    backgroundColor: 'white',
    bottom:500
  },
  Job: {
    position: "absolute",
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 260,
    left: 20
  },
  JobTextBox: {
    position: "absolute",
    width: Dimensions.get('screen').width,
    height: 80,
    backgroundColor: 'white',
    bottom: 380,
  },
  LovrButton: {
    position: "absolute",
    width: Dimensions.get('screen').width - 150,
    height: 50,
    backgroundColor: '#FF3C5E',
    borderRadius: 25,
    bottom: 250
  },
  TextButton: {
    alignSelf: "center",
    paddingTop: 11,
    color: "white",
    fontSize: 18,
  },
  CameraBox: {
    position: 'absolute',
    top: -24,
    right: 24,
    width: 60,
    height: 60,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  BackButton: {
    zIndex: 1,
    position: 'absolute',
    marginTop: 60,
    left: 0,
  },
  Camera: {
    width: 60,
    height: 60,
    top: -12,
    right: 35,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    flex: 1,
    margin: 9,
    width: Dimensions.get('screen').width / 4,
    height: 150,
    maxHeight: 304,
    backgroundColor: '#CCC',
    borderRadius: 10,
  },
  deleteButton: {
    height: 20, 
    width: 20,
    bottom: 15,
    right: 15,
    position: 'absolute',
    borderRadius: 10,
    },
  deleteButtonImage: {
      height: 20, 
      width: 20,
  },
});