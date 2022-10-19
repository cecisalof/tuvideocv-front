import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
import { PrimaryButton } from '../styles/button';
 
const axios = require('axios').default;

const LogInScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");
  // userInfo includes uuid
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if(userToken && userToken.length > 0){
      if(userInfo && userInfo.uuid){
        // User is properly looged in
      navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
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
    getToken();
  };


  const getToken = async () => {
    const response = await axios.post(BASE_URL + API_URL.LOGIN,
      {
        email: email,
        password: password
      })
    try{
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
        <TextInput
           value={password}
           onChangeText={(password) => setPassword(password.trim())}
           placeholder={'*****'}
           secureTextEntry={true}
           style={styles.input}
        />
        <PrimaryButton
          title='Iniciar sesión'
          onPress={onPress}
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