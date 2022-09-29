import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
  API_URL, BASE_URL,
} from '../axios/config';
 
const axios = require('axios').default;

const SignUpScreen = () => {
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");


  const onPress = async () => {
    await createUser()
  }

  const createUser = async () => {
     await axios.post(BASE_URL + API_URL.SIGNUP,
    {
      email: email,
      password: password
    })
    .then(function (response) {
      const data = response.data;
      return data;
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
          // To do: Crear usuario y redirigir a home
          onPress={onPress}
          >
          <Text style={styles.buttonTitle}>Registrame</Text>
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
  buttonTitle: {
    color: '#fff'
  }
});

export default SignUpScreen;