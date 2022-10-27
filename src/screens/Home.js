import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import { Camera, CameraType } from 'expo-camera';

const axios = require('axios').default;

const HomeScreen = ({ navigation, route }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { token } = route.params;
  const [data, setData] = useState("");
  console.log(data);
  
  useEffect(() => {
    getJobList();
  }, []);
  
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

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
  
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Inicio</Text>
    {/* <View style={styles.container}>
    <Camera style={styles.camera} type={type}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </Camera>
    </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});

export default HomeScreen;

