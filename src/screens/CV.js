// import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
// import {
//   API_URL, BASE_URL,
// } from '../axios/config';
// import CustomTabBar from '../components/CustomTabBar'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Jobs from './Jobs'
// // import { Camera, CameraType } from 'expo-camera';

// const axios = require('axios').default;

// const CVScreen = ({ navigation, route }) => {
// const { token }= route.params;
// const [type, setType] = useState(CameraType.back);
// const [permission, requestPermission] = Camera.useCameraPermissions();

//  const [data, setData] = useState("");  
//  useEffect(() => {
//    getJobList();
//  }, []);

// const toggleCameraType = () => {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }
  
//   if (!permission) {
//     // Camera permissions are still loading
//     return <View />;
//   }

//   if (!permission.granted) {
//     // Camera permissions are not granted yet
//     return (
//       <View>
//         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//         <Button onPress={requestPermission} title="grant permission" />
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Inicio</Text>
//     {/* <View style={styles.container}>
//     <Camera style={styles.camera} type={type}>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//           <Text style={styles.text}>Flip Camera</Text>
//         </TouchableOpacity>
//       </View>
//     </Camera>
//     </View> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     margin: 64,
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default CVScreen;