import React, { useEffect, useState } from 'react';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { PrimaryButton } from '../styles/button';
import Context from '../../contexts/context';
import { useContext } from 'react';

const axios = require('axios');

const MainScreen = ({ navigation, route }) => {
  const { uuid, token }= route.params;
  const [data, setData] = useState("");

   // userData from Context
   const userData = useContext(Context);

  useEffect(() => {
    getUser();
    // read from memory
    getData();
  }, []);

  const getUser = async () => {
    const response = await axios.get(BASE_URL + API_URL.USER + uuid,
      {
        headers: {
          'Authorization': `token ${token}`
        }
      })
    try{
      const data = response.data;
      setData(data)
    } catch (error){
      console.log(error);
    }
  };

  // Getting video Uri from memory
  const getData = async () => {
    userData.readFromMemory(() => {
      if (userData.video != null){
        console.log('video from data', userState.video);
      }
    });
  }

const onPress = () => {
  navigation.navigate('CV', { 
    uuid: uuid, 
    token: token
   })
};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
       <View style={styles.imageContainer}>
          <Image source={require('../assets/icons/home-c.png')} style={styles.iconTop} />
        </View>
          <Text style={styles.title}>{"Hello " + data.name + "!"}</Text>
          <View style = {styles.backgroundImage}>
            <ImageBackground source = {require('../assets/icons/home-b.png')}>
             <Image style = {styles.image} source = {require('../assets/icons/home-p.png')} />
            </ImageBackground>
            </View>
    <Text style={{ fontSize: 20,margin:10,fontWeight:'bold', alignItems: 'center', justifyContent: 'center'}}>
    Tutorial for your  
    <Text style={{ fontSize: 20,margin:10,fontWeight:'bold', color: '#FF3BE3',  alignItems: 'center', justifyContent: 'center'}}>
    { " " + "perfect" + " "}
    </Text>
    video!
      </Text>
    <Text style={{ fontSize: 15,margin:10,fontWeight:'italic', color: '#7E777780',  alignItems: 'center', justifyContent: 'center'}}>
    Play your work today!
    </Text>
      <PrimaryButton
        title= 'Record new video'
        onPress={onPress}>
      </PrimaryButton>
          
          {/* <LinearGradient
    colors={['#08dee5', '#FF7EFD', '#7357FF']}
    start={[0, 0]}
    end={[1, 0]}
    style={styles.statusStyle}
    
  > 
  <TouchableOpacity
                  key="1"
                  accessibilityRole="button"
                  onPress={onPressJobs}
                  style={{ flex: 1 }}>
                  <Image source={require('../assets/icons/vacancies.png')} style={styles.image_play } />
                  
                </TouchableOpacity>
                <TouchableOpacity
                  key="2"
                  accessibilityRole="button"
                  onPress={onPressHome}
                  style={{ flex: 1}}>
                  <Image source={require('../assets/icons/video.png')} style={styles.image_video} />
                  
                </TouchableOpacity>

                <TouchableOpacity
                  key="3"
                  accessibilityRole="button"
                  onPress={onPressJobs}
                  style={{ flex: 1}}>
                  <Image source={require('../assets/icons/applications.png')} style={styles.image_profile} />
                  
                </TouchableOpacity>
  
  </LinearGradient>  */}
      
     </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  iconTop: {
    width: '35%',
    minWidth: 100,
    maxWidth: 200,
    margin: 10,
    resizeMode: 'contain',
  },
  image_play: {
    width: 55,
    height: 55,
    left:20,
    margin: 10,
  },
  image_video: {
    width: 55,
    height: 55,
    left:170,
    bottom: 10
  },

  image_profile: {
    width: 55,
    height: 55,
    left:300,
    bottom: 35
  },
  
  backgroundImage: {
    width: '70%',
    minWidth: 100,
    maxWidth: 600,
    resizeMode: 'contain',
  },
  image: {
    width: '90%',
    minWidth: 100,
    maxWidth: 400,
    height: 230,
    left: 12,
    resizeMode: 'contain',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    margin: 20,
  },
  imageContainer: {
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
  },
  statusStyle: {
      top: 590,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: "hidden",
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
  },
});


export default MainScreen;