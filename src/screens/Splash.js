
import * as React from 'react';
import { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import Context from '../../contexts/context';
import { CommonActions } from '@react-navigation/native';


const SplashScreen = ({ navigation }) => {
  const userData = useContext(Context);
  console.log('Mira el context', userData)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Cargando...</Text>

    </View>
  );
}

export default SplashScreen;