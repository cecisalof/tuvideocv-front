import React, { useEffect, useState } from 'react';
import { View, Text, LogBox } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';

const axios = require('axios').default;

const HomeScreen = ({ navigation, route }) => {
  const { token }= route.params;
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
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Inicio</Text>
    </View>
  );
}
export default HomeScreen;