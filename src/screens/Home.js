import React, { useEffect, useState } from 'react';
import { View, Text, LogBox } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';

const axios = require('axios').default;

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  
  useEffect(() => {
    getJobList();
  }, []);
  

  const getJobList = async () => {
    const response = await axios.get(BASE_URL + API_URL.JOB_LIST,
      {
        headers: {
          'Authorization': `token 30192393d2bdb69ac3120f7991ee1f9dc7b4ae41`
        }
      })
    try{
      const data = response.data;
      setData(data);
    } catch (error){
      console.log(error);
    }
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Inicio</Text>
    </View>
  );
}
export default HomeScreen;