
import React, {useEffect} from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import Context from '../../contexts/context';
import { CommonActions } from '@react-navigation/native';
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

  useEffect(() => {
    userData.readFromMemory((userState) => {
      console.log('Load from memory', userState)
      if(userState && userState.token && userState.token.length > 0 && userState.userData && userState.userData.uuid){
        // User is properly looged in
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        )
      }else{
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
      <View>
        <Text>Cargando... {userData.token}</Text>

      </View>
    );
  }
// };

export default SplashScreen;