import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
// import Context from '../../contexts/context';
// import { useContext } from 'react';
import {
  API_URL, BASE_URL,
} from '../axios/config';
 
const axios = require('axios').default;

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  const onPress = async () => {
    await getToken();
    if(userToken && userToken.length > 0){
      // User is properly looged in
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )
    }else {
      // Redirect to signup
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SignUp'}],
        })
      )
    }    
  };

  const getToken = async () => {
    await axios.post(BASE_URL + API_URL.LOGIN,
   {
     email: email,
     password: password
   })
   .then(function (response) {
     const token = response.data.token;
     setUserToken(token);
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
          onChangeText={(email) => setEmail(email.toLowerCase().trim())}
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
          testID={"LoginEmailAddress"}
        />
        <TextInput
           value={password}
           onChangeText={(password) => setPassword(password.trim())}
           placeholder={'Contraseña'}
           secureTextEntry={true}
           style={styles.input}
        />
        <TouchableOpacity
          style={styles.button}
          title={'Iniciar sesión'}
          // TODO: Call to a new userData context function 
          onPress={onPress}
        >
          <Text style={styles.buttonTitle}>Iniciar Sesión</Text>
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
  button: {
    borderWidth: 1,
    borderColor: '#c00',
    backgroundColor: '#c00',
    padding: 10,
    alignItems: 'center',
  },
  buttonTitle: {
    color: '#fff'
  }
});

export default LogInScreen;