import React, { useEffect, useState, useRef } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Video } from 'expo-av';
import { PrimaryButton } from '../styles/button';
import * as Sharing from 'expo-sharing';
const axios = require('axios').default;

const CVScreen = ({ navigation}) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  
  const [type, setType] = useState(CameraType.back);
  console.log(type);
  
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

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
    cameraRef.current.stopRecording();
  }


  if (video) {
    let shareVideo = () => {
      Sharing.shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
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
        <PrimaryButton title="Compartir" onPress={shareVideo} />
        {hasMediaLibraryPermission ? <PrimaryButton title="Guardar" onPress={saveVideo} /> : undefined}
        <PrimaryButton title="Canelar" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef} type={type}>
      <View style={styles.buttonContainer}>
        <PrimaryButton title={isRecording ? "Stop Recording" : "Record Video"} onPress={isRecording ? stopRecording : recordVideo} />
        <PrimaryButton title={"Cámara frontal"} onPress={toggleCameraType} />
      </View>
    </Camera>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end"
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