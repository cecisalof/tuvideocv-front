import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import { PrimaryButton } from '../styles/button';
import Context from '../../contexts/context';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios').default;

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  // userInfo includes uuid
  const [userInfo, setUserInfo] = useState({});
  const userData = useContext(Context);
  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'SessionLogged',
        'true'
      );
      await AsyncStorage.setItem(
        'userToken',
        userToken
      );
      console.log("Se guarda el login del usuario")
    } catch (error) {
      console.log("No se ha podido guardar el login del usuario")
      // Error saving data
    }
  };
  useEffect(() => {
    if(userToken && userToken.length > 0){
      if(userInfo && userInfo.uuid){
        console.log("Entra en el doble if de login.js")
        //TO DO SAVE USER LOGEED DATA
        // userData.saveToken(userToken)

        // User is properly looged in
      _storeData();
      navigation.dispatch(
          CommonActions.reset({
            index: 0,
            // passing userToken to Home 
            routes: [{ name: 'Home', params: { token: userToken } }],
          })
        )
      } else {
        // Redirect to signup
      navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Signup'}],
          })
        )
      } 
    }
  }, [userToken, userInfo]);
  
  const onPress = () => {
    setLoadingVisible(!isLoadingVisible);
    getToken();
  };
  const [isLoadingVisible, setLoadingVisible] = useState(false);

  const getToken = async () => {
    try{
      const response = await axios.post(BASE_URL + API_URL.LOGIN,
        {
          email: email,
          password: password
        })
      const data = response.data;
      setUserInfo(data);
      setUserToken(data.token);
    } catch (error){
      console.log("Entra en error Login");
      console.log(error.response.data);
    }
 };

 //<ActivityIndicator size="large" color="#8325EC" /> Loading circle
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={email}
          //onChangeText={(email) => setEmail(email.toLowerCase().trim())}
          onChangeText={(email) => setEmail("aaaa@gmail.com")}
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          testID={"LoginEmailAddress"}
        />
        <TextInput
           value={password}
           //onChangeText={(password) => setPassword(password.trim())}
           onChangeText={(password) => setPassword("123Adri456")}
           placeholder={'*****'}
           secureTextEntry={true}
           style={styles.input}
        />
        <PrimaryButton
          title='Iniciar sesión'
          onPress={onPress}
        >
        </PrimaryButton>
        <ActivityIndicator size="large" color="#8325EC" animating={isLoadingVisible}/>
      </View>
      {userInfo.error &&
        <Text>Comprueba tu email y contraseña y vuelve a intentarlo</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default LogInScreen;