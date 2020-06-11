import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, Dimensions, View, Image, TouchableOpacity, TextInput, Animated, Block} from 'react-native';
import {ActionSheet, Root} from 'native-base';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import {connect} from 'react-redux';
import { database, storage } from './firebase';
import * as Random from 'expo-random';

const height = Dimensions.get('screen').height;

function EditProfile ({navigation, user}) {
  console.log("EditProfile -> user", user)
  
  const [name, setName] = useState(null)
  const [fileList, setFileList] = useState([ { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' }, { uri: 'a' } ])
  const [urlArray, setUrlArray] = useState([]);
  const [myInfo, setMyInfo] = useState({})
  
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
    //take myinfo from users collection
    const takeMyInfoFirebase = async () => { 
      await database.ref('/users/'+ user).once('value', function(userSnap){
        let userInfo = userSnap.val()
        //adding user info to states
        setMyInfo(userInfo)
      });
    }
    takeMyInfoFirebase()
  }, []);

  const uploadTest = async () => {
    console.log("uploadTest -> user", user)
    let imgPickerUri = "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540j1ca%252Flovr/ImagePicker/3ae64f00-0c19-4f22-ac83-4828a046c6c6.jpg"
    let randomArray = await Random.getRandomBytesAsync(4);

    let storageRef = storage.ref(user + '/uploadTest3');
    let fileExtension = imgPickerUri.split('.').pop()
    console.log("uploadTest -> fileExtension", fileExtension)

    // const testPicture = await fetch("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540j1ca%252Flovr/ImagePicker/3ae64f00-0c19-4f22-ac83-4828a046c6c6.jpg")
    // const imgBlob = await testPicture.blob()
    
    // storageRef.put(imgBlob).catch((err) => {console.log('error de la muerte', err)})
  }

  const takingDownUrl = async () => {
    let storageRef = storage.ref().child(user);
    // storageRef.getDownloadURL().then(function(url){
    //   console.log('this is the url', url)
    // }).catch(function(error) {
    //   console.log('error de la muerte', error)
    // });

    storageRef.listAll().then(function(res){
      res.items.forEach(function(itemRef) {
        // All the items under listRef.
        console.log('this is the reference', itemRef.toString())
        getImgUrl(itemRef)
      });
    }).catch(function(error) {
      console.log('error de la muerte', error)
    });

  }

  const getImgUrl = (images) => {
    images.getDownloadURL().then(function(url){
      console.log('this is the url', url)
    }).catch(function(error) {
      console.log('error de la muerte2', error)
    });
  }



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
    const BUTTONS = ['Prendre une photo', 'Choisir une photo depuis la galerie', 'Annuler'];
    ActionSheet.show(
      {options: BUTTONS,
      cancelButtonIndex: 2,
      title: 'Sélectionner une photo'},
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
              <TouchableOpacity style={styles.BackButton} onPress={() => navigation.navigate('MyProfile')}>
                <Image source={require('../assets/Logos/BackLogoFromChatRequets.png')} style={{width: 75, height: 50}}></Image>
              </TouchableOpacity>
                
                <FlatList
                  style={{ marginTop: 20}}
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
                >
                  
                  <View style={styles.container}>
                    <TouchableOpacity onPress={() => _panel.hide()} style={styles.RectangleBox}>
                      <Image source={require('../assets/Logos/RectangleSlidingPanel.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClickAddImage()} style={styles.CameraBox}>
                      <Image source={require('../assets/Logos/AddPictureLogo.png')} style={styles.Camera}/>
                    </TouchableOpacity>

                    <Text style={styles.ProfileName}>{myInfo.first_name}, 22</Text>
                    <Text style={styles.AboutMe}>A Propos de {name}</Text>
                    <TextInput
                      style={styles.DescriptionTextBox}
                      placeholder={"Le meilleur moyen de séduire c'est de s'ouvrir"}
                      />
                    <Text style={styles.Job}>Job et études</Text>
                    <TextInput
                      style={styles.JobTextBox}
                      placeholder={'  Poste'}/>
                    <TouchableOpacity style={styles.LovrButton} onPress={ () => {}}>
                      <Text style={styles.TextButton}>Sauvegarder</Text>
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
    zIndex: 2,
    backgroundColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  RectangleBox: {
    position: 'absolute',
    top: 10,
  },
  ProfileName: {
    position: "absolute",
    fontWeight: '900',
    fontSize: 30,
    marginVertical: 50,
    left: 20
  },
  AboutMe: {
    position: "absolute",
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 100,
    left: 20
  },
  DescriptionTextBox: {
    position: "absolute",
    width: Dimensions.get('screen').width,
    height: 80,
    backgroundColor: 'white',
    marginVertical: 140,
    padding: 25,
  },
  Job: {
    position: "absolute",
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 230,
    left: 20,
  },
  JobTextBox: {
    position: "absolute",
    width: Dimensions.get('screen').width,
    height: 80,
    backgroundColor: 'white',
    marginVertical: 270,
    padding: 25,
  },
  LovrButton: {
    position: "absolute",
    width: Dimensions.get('screen').width - 150,
    height: 50,
    backgroundColor: '#FF3C5E',
    borderRadius: 25,
    marginVertical: 400
  },
  TextButton: {
    alignSelf: "center",
    paddingTop: 11,
    color: "white",
    fontSize: 18,
  },
  CameraBox: {
    position: 'absolute',
    top: -36,
    right: 59,
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
    //top: -36,
    //right: 59,
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

// for redux
function mapStateToProps(state) {
  return { user : state.user }
}

export default connect(
  mapStateToProps, 
  null
)(EditProfile);