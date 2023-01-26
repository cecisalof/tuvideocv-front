
import React, {useEffect} from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import Context from '../../contexts/context';
import { CommonActions } from '@react-navigation/native';
import {
   useFonts,
   Nunito_400Regular,
 } from '@expo-google-fonts/nunito';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {
//   useFonts,
//   Nunito_200ExtraLight,
//   Nunito_300Light,
//   Nunito_400Regular,
//   Nunito_500Medium,
//   Nunito_600SemiBold,
//   Nunito_700Bold,
//   Nunito_800ExtraBold,
//   Nunito_900Black,
//   Nunito_200ExtraLight_Italic,
//   Nunito_300Light_Italic,
//   Nunito_400Regular_Italic,
//   Nunito_500Medium_Italic,
//   Nunito_600SemiBold_Italic,
//   Nunito_700Bold_Italic,
//   Nunito_800ExtraBold_Italic,
//   Nunito_900Black_Italic,
// } from '@expo-google-fonts/nunito';


const SplashScreen = ({ navigation }) => {
  const userData = useContext(Context);
  console.log('Mira el context', userData)
     let [fontsLoaded] = useFonts({
     Nunito_400Regular});

  // let [fontsLoaded] = useFonts({
  //   Nunito_200ExtraLight,
  //   Nunito_300Light,
  //   Nunito_400Regular,
  //   Nunito_500Medium,
  //   Nunito_600SemiBold,
  //   Nunito_700Bold,
  //   Nunito_800ExtraBold,
  //   Nunito_900Black,
  //   Nunito_200ExtraLight_Italic,
  //   Nunito_300Light_Italic,
  //   Nunito_400Regular_Italic,
  //   Nunito_500Medium_Italic,
  //   Nunito_600SemiBold_Italic,
  //   Nunito_700Bold_Italic,
  //   Nunito_800ExtraBold_Italic,
  //   Nunito_900Black_Italic,
  // });
  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('SessionLogged');
      console.log("Entra correctamente en fetchData "+value)
      if (value == 'true') {
        console.log("Usuario Logueado "+value)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        )
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log("Error al sacar el session "+error);
      // Error retrieving data
    }
  };
  useEffect(() => {
    console.log("Entra en splash ");
    fetchData();
    userData.readFromMemory((userState) => {
      console.log('Load from memory', userState)
      if (userState != null){
        console.log('Entra userState NotNull')
        if(userState.token && userState.token.length > 0 && userState.userData && userState.userData.uuid){
          // User is properly looged in
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          )
        }
      }else{
        console.log('Entra userState Null')
        // Redirect to login
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login'}],
          })
        )
      }
    });
  }, []);

  // if (!fontsLoaded) {
  //   return null;
  // } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Cargando... {userData.token}</Text>
      </View>
    );
  }
// };

export default SplashScreen;