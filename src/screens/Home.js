import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from '../styles/button';

const axios = require('axios').default;

const HomeScreen = ({ navigation, route }) => {
const { uuid }= route.params;

const onPress = () => {
  navigation.navigate('CV', { 
    uuid: uuid
   })
}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Inicio</Text>
      <PrimaryButton
        title= 'Grabar CV'
        onPress={onPress}
        >
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen;