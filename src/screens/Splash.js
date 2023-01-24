
import React, {useEffect} from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import Context from '../../contexts/context';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
  const userData = useContext(Context);

  const fetchData = async () => {
    try {
      const value = await AsyncStorage.getItem('SessionLogged');
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
    fetchData();
    userData.readFromMemory((userState) => {
      console.log('splash', userState);
      if (userState != null){
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

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Cargando... {userData.token}</Text>
      </View>
    );
  }
// };

export default SplashScreen;