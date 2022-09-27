import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';

// const onPress = () => {
  
// } 

const SignUpScreen = () => {
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={email}
          onChangeText={(email) => setUserEmail( email )}
          placeholder={'Email'}
          style={styles.input}
          keyboardType={'email-address'}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setUserPassword( password )}
          placeholder={'Contraseña'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <TouchableOpacity
          style={styles.button}
          // To do: Crear usuario y redirigir a home
          // onPress={onPress}
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