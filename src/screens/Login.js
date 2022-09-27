import React, { useState } from 'react';

import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Context from '../../contexts/context';

const LogInScreen = () => {
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
          title={'Iniciar sesión'}
          onPress={() => {
              // TODO: Call to a new userData context function 
          }}
        />
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