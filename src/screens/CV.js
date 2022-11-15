import React, { useEffect, useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { PrimaryButton } from '../styles/button';
import * as Sharing from 'expo-sharing';
const axios = require('axios').default;
import {
  API_URL, BASE_URL,
} from '../axios/config';

const CVScreen = ({ navigation, route}) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [videoUri, setVideoUri] = useState('');
  
  const [type, setType] = useState(CameraType.back);
  
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
    if (video) {
      setVideoUri(video.uri)
    }
  }, [video]);

  const requestPermission = () => {
    setHasCameraPermission(cameraPermission.status === 'granted');
    setHasMicrophonePermission(microphonePermission.status === 'granted');
  }

  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  
  if (hasCameraPermission === undefined || hasMicrophonePermission === undefined) {
    // Camera permissions are still loading
    return <Text style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>Request permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <View>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const recordVideo = async () => {
    setIsRecording(true);
    let options = {
      maxDuration: 60,
      mute: false
    };
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  }

  const stopRecording = () => {
    setIsRecording(false);
    setVideo(video);
    cameraRef.current.stopRecording();
  }


  if (video) { 
    let saveVideo = async () => {
      // MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
      //   setVideo(undefined);
      // });
      const response = await axios.patch(BASE_URL + API_URL.USER + route.params.uuid,
        {
          video_cv: video.uri 
        })
      try{
        const data = response.data;
        console.log('data', data);
      } catch (error){
        console.log(error);
      }
    };
  return (
    <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode='contain'
          isLooping
        />
        {hasMediaLibraryPermission ? <PrimaryButton title="Guardar" onPress={saveVideo} /> : undefined}
        <PrimaryButton title="Cancelar" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef} type={type}>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={isRecording ? "Parar grabación" : "Grabar vídeo"} onPress={isRecording ? stopRecording : recordVideo} />
        <PrimaryButton title={"Rotar cámara"} onPress={toggleCameraType} />
      </View>
    </Camera>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: "transparent",
  },
  buttonContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 30
  },
  video: {
    flex: 1,
    alignSelf: "stretch"
  }
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  // camera: {
  //   flex: 1,
  // },
  // buttonContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   backgroundColor: '#fff',
  //   margin: 64,
  // },
  // button: {
  //   flex: 1,
  //   alignSelf: 'flex-end',
  //   alignItems: 'center',
  // },
  // text: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
  // video: {
  //   flex: 1,
  //   alignSelf: "stretch"
  // }
});

export default CVScreen;