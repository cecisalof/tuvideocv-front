import React, { useEffect, useState } from 'react';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import CustomTabBar from '../components/CustomTabBar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Jobs from './Jobs'
import Main from './Main'
import MyApplications from './MyApplications'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Camera, CameraType } from 'expo-camera';
import { StyleSheet} from 'react-native';

const axios = require('axios').default;

const HomeScreen = ({ navigation, route }) => {
  const [token, setToken] = useState("Loading");
  const [data, setData] = useState("");  
  
  useEffect(() => {  
    getUserToken();
  }, []);

  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      if (value != null) {
        setToken(value);
        getJobList(value);
        //getJobFavorites(value);
        //getJobCandidates(value);
      } else {
        setToken(route.params.token);
        getJobList(route.params.token);
        //getJobFavorites(route.params.token);
        //getJobCandidates(route.params.token);
      }
    } catch (error) {
      console.log("Error al sacar el session "+error);
      // Error retrieving data
    }
  };
  const getJobList = async (token) => {
    try{
      const response = await axios.get(BASE_URL + API_URL.JOB_LIST,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        })
      const data = response.data;
      setData(data.results);
    } catch (error){
      console.log("Entra en error Home");
      console.log(error.response.data);
    }
  };

  function JobScreen() {
    return (
      <Jobs data={data} token={token}/>
      //<Jobs/>
    );
  }
  function PerfilScreenF() {
    return (
    <Main route={route} navigation={navigation}/> //Poner el layout que corresponda
    //<MyApplications />
    );
  }
  function MyAppScreen() {
  //setDataRefresh(true);
    return (
      <MyApplications token={token}/>
    );
  }
  const Tab = createBottomTabNavigator();
    return (
           <Tab.Navigator initialRouteName="Play" tabBar={(props) => <CustomTabBar {...props} />}>
           <Tab.Screen
           name="Play"
           component={JobScreen}
           options={{
            tabBarLabel: 'Play',
            headerShown: false          
          }}
         />
         <Tab.Screen
           name="MyHome"
           component={PerfilScreenF}
           options={{
             tabBarLabel: 'MyHome',
             headerShown: false            
           }}
         />
         <Tab.Screen
           name="MyApp"
           component={MyAppScreen}
           options={{
             tabBarLabel: 'MyApp',
             headerShown: false            
           }}
         />
         </Tab.Navigator>
     )
  };

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
    maxWidth: 600,
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


export default HomeScreen;
