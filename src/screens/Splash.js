
import React, {useEffect} from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import Context from '../../contexts/context';
import { CommonActions } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {
  const userData = useContext(Context);
  console.log('Mira el context', userData)

  useEffect(() => {
    userData.readFromMemory((userState) => {
      console.log('Load from memory', userState)
      if(userState.token && userState.token.length > 0 && userState.userData && userState.userData.uuid){
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
            routes: [{ name: 'SignUp'}],
          })
        )
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Cargando... {userData.token}</Text>

    </View>
  );
}

export default SplashScreen;