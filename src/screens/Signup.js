import React, { useState, useEffect } from 'react';
import { PrimaryButton } from '../styles/button';
import { CommonActions } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';

const axios = require('axios');

const SignUpScreen = ( {navigation} ) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userInfo, setUserInfo] = useState({})
  console.log("Hola hola",userInfo);

  useEffect(() => {
  
    if(userToken && userToken.length > 0){
        // User is properly looged in
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )
    }
  }, [userToken, userInfo]);
  
  const onPress = () => {
    createUser();
  }

  const createUser = async () => {
    try{
      const response = await axios.post(BASE_URL + API_URL.SIGNUP,
        {
          email: email,
          password: password
        })
      const data = response.data;
      setUserInfo(data);
      setUserToken(data.token);
    } catch (error){
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email.toLowerCase().trim())}
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          testID={"LoginEmailAddress"}
        />
         {/* {userInfo[{'email'}] &&
          <Text>Este campo está vacío o es inválido</Text>
          } */}
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          placeholder={'Contraseña'}
          secureTextEntry={true}
          style={styles.input}
        />
        <PrimaryButton
          title='Registrame'
          onPress={onPress}
          >
        </PrimaryButton>
        <PrimaryButton
          title='Ir a LogIn'
          onPress={() => navigation.navigate('Login')}
          >
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#c00',
    backgroundColor: '#c00',
    padding: 10,
    alignItems: 'center',
  },
  logInButton: {
    borderWidth: 1,
    borderColor: '#c00',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#fff'
  },
  buttonText: {
    color: '#c00',
  }
});

export default SignUpScreen;