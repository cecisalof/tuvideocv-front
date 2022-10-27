import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import CustomTabBar from '../components/CustomTabBar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Jobs from './Jobs'
// import { Camera, CameraType } from 'expo-camera';

const axios = require('axios').default;

const HomeScreen = ({ navigation, route }) => {
  const { token }= route.params;

  const [data, setData] = useState("");  
  useEffect(() => {
    getJobList();
  }, []);
  
  const getJobList = async () => {
    const response = await axios.get(BASE_URL + API_URL.JOB_LIST,
      {
        headers: {
          'Authorization': `token ${token}`
        }
      })
    try{
      const data = response.data;
      setData(data.results);
    } catch (error){
      console.log(error);
    }
  };

  function JobScreen() {
    return (
      <Jobs data={data}/>
    );
  }
  function PerfilScreenF() {
    return (
    <Jobs data={data}/>
    );
  }
  function PerfilScreen3() {
    return (
      <Jobs data={data}/>
    );
  }
  const Tab = createBottomTabNavigator();
    return (
           <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
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
           name="Me"
           component={PerfilScreen3}
           options={{
             tabBarLabel: 'Me',
             headerShown: false            
           }}
         />
         </Tab.Navigator>
     )
  };
  
export default HomeScreen;
