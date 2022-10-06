import React, { useState } from 'react';
import Context from '../../contexts/context';
import { useContext } from 'react';
import { CommonActions } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
 
const axios = require('axios').default;

const SignUpScreen = ( {navigation} ) => {
  const userData = useContext(Context);
  
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userInfo, setUserInfo] = useState({})

  const onPress = async () => {
    await createUser();
    console.log('token inside onpRESS', userToken);
    console.log('data', userInfo);
    // Wait till token is created???
     if(userToken && userToken.length > 0 && userInfo){
      // User is properly looged in
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )
    }
  // else{
  //   // Redirect to login
  //   navigation.dispatch(
  //     CommonActions.reset({
  //       index: 0,
  //       routes: [{ name: 'SignUp'}],
  //     })
  //   )
  // }
  }

  const createUser = async () => {
     await axios.post(BASE_URL + API_URL.SIGNUP,
    {
      email: email,
      password: password
    })
    .then(function (response) {
      const data = response.data;
      console.log('inside post request', data);
      setUserInfo(data)
      setUserToken(data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={email}
          onChangeText={(email) => setUserEmail(email.toLowerCase().trim())}
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          testID={"LoginEmailAddress"}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setUserPassword(password.trim())}
          placeholder={'Contraseña'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          >
          <Text style={styles.buttonTitle}>Registrame</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logInButton}
          onPress={() => navigation.navigate('LogIn')}
          >
          <Text style={styles.buttonText}>Ir al LogIn</Text>
        </TouchableOpacity>
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