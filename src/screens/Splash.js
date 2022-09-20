
import * as React from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import Context from '../../contexts/context';

const SplashScreen = () => {
  const userData = useContext(Context);
  console.log('Mira el context', userData)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  );
}

export default SplashScreen;