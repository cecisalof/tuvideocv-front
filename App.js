import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/Splash';
import LogInScreen from './src/screens/Login';
import SignUpScreen from './src/screens/Signup';
import HomeScreen from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserState from './contexts/UserState';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <UserState>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  );
}

export default App;