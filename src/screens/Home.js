import React, { useEffect, useState } from 'react';
import { View, Text, LogBox } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import CustomTabBar from '../components/CustomTabBar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Empleos from './Empleos'

const axios = require('axios').default;

const HomeScreen = ({ navigation, route }) => {
  /*const { token }= route.params;
  const [data, setData] = useState("");
  console.log(data);
  
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
      setData(data);
    } catch (error){
      console.log(error);
    }
  };*/
  function JobScreen() {
    return (
      <Empleos />
    );
  }
  function PerfilScreenF() {
    return (
    <Empleos/>
    );
  }
  function PerfilScreen3() {
    return (
      <Empleos />
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
  
}
export default HomeScreen;