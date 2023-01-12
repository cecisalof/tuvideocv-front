import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, AsyncStorageStatic, ActivityIndicator } from 'react-native';
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
            routes: [{ name: 'Home', params: { 
              uuid: userInfo.uuid,
              token: userToken
              } 
            }],
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
    //setLoadingVisible(!isLoadingVisible);
    getToken();
  };
  //const [isLoadingVisible, setLoadingVisible] = useState(false);

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
      <View style={styles.inputContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('../assets/icons/video-c.png')} style={styles.iconTop} />
          <Text style={styles.title}>Login</Text>
        </View>
        <TextInput
          value={email}
          //onChangeText={(email) => setEmail(email.toLowerCase().trim())}
          onChangeText={(email) => setEmail("aaaa@gmail.com")}
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          testID={"LoginEmailAddress"}
          placeholderTextColor='#7E7777'
        />
        <TextInput
          value={password}
          //onChangeText={(password) => setPassword(password.trim())}
          onChangeText={(password) => setPassword("123Adri456")}
          placeholder={'Contraseña'}
          secureTextEntry={true}
          style={styles.input}
          placeholderTextColor='#7E7777'
        />
        <View style={styles.btnContainerStyle}>
          <PrimaryButton
            title='Iniciar sesión'
            onPress={onPress}
          />
        </View>
      </View>
      {userInfo.error &&
        <Text style={styles.errorText}>Comprueba tu email y contraseña y vuelve a intenarlo</Text>
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
  iconTop: {
    width: '35%',
    minWidth: 100,
    maxWidth: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  imageContainer: {
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    width: '100%',
    height: 44,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    fontWeight: '600',
    fontSize: 15
  },
  btnContainerStyle: {
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  errorText: {
    color: 'red',
    margin: 20
  }
});

export default LogInScreen;