import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/Splash';
import LogInScreen from './src/screens/LogIn';
import SignUpScreen from './src/screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserState from './contexts/UserState';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <UserState>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  );
}

export default App;