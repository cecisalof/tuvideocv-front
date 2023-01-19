import React, { useEffect, useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { PrimaryButton } from '../styles/button';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Sharing from 'expo-sharing';

const axios = require('axios').default;

import {
  API_URL, BASE_URL_VIDEOS
} from '../axios/config';
import Context from '../../contexts/context';
import { useContext } from 'react';

const CVScreen = ({ route}) => {
  const { uuid, token } = route.params;
 
  // userData from Context
  const userData = useContext(Context);
  
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [videoUri, setVideoUri] = useState('');
  const [status, setStatus] = React.useState({});
  
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

  useEffect(() => {
    if (videoUri) {
      // videoToBlob(videoUri);
    }
  }, [videoUri])



    // utitlity function to convert BLOB to BASE64
    // const blobToBase64 = (blob) => {
    //   console.log(blob);
    //   const reader = new FileReader();
    //   // console.log('READER', reader);
    //   // reader.readAsDataURL(blob);
    //   // console.log();
    //   // console.log('reader.readAsDataURL(blob)', reader.readAsDataURL(blob));
    //   return new Promise((resolve) => {
    //     reader.onloadend = () => {
    //       resolve(reader.result);
    //     };
    //   });
    // };


  // const videoToBlob = async (videoUrl) => {
  //   console.log('videoUrl',  videoUrl);
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       console.log(xhr.response);
  //     };
  //     // xhr.onreadystatechange = () => {
  //     //   if (xhr.readyState === 4) {
  //     //     console.log('here!');
  //     //       resolve(xhr.response);
  //     //   }
  //     // };
  //     xhr.onerror = function (e) {
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("PATCH", videoUrl, true);
  //     xhr.send(null);
  // })
    // const videoBase64 = await blobToBase64(blob);
    // console.log('videoBase64', videoBase64);

  //   // We're done with the blob and file uploading, close and release it
  //   blob.close()
  // };

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
      // set max duration
      maxDuration: 60,
      mute: false
    };
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  }

  const stopRecording = async () => {
    setIsRecording(false);
    setVideo(video);
    cameraRef.current.stopRecording();
  }

  if (video) { 
    let saveVideo = async () => {
      // Saving video in redux
      // userData.saveUserVideoToMemory(video.uri);
      // const value = await AsyncStorage.setItem(
      //   'video',
      //   JSON.stringify(video.uri)
      // );
      // console.log('value', value);
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
      // PATCH REQUEST
      sendVideo();
    };

    let formdata = new FormData();
    formdata.append("video_cv", videoUri);
    console.log('FORM DATA', formdata);


    const sendVideo = async () => {
      console.log('sending video', uuid);

      try {
        const response = await axios.patch(BASE_URL_VIDEOS + API_URL.USER + uuid, formdata,
          {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data; boundary=\"--\"/',
            },
          })
        const data = response.data;
        console.log('data', data);
      } catch (error) {
        if (error.response) {
          console.log('Error', error);
          console.log('response.data', error.response.data);
          console.log('status', error.response.status);
          console.log('headers', error.response.headers);
        }
        console.log(error.request);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{uri: video.uri}}
          useNativeControls
          resizeMode='contain'
          isLooping={false}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
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
    // alignItems: 'center',
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