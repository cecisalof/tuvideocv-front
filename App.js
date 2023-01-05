import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/Splash';
import LogInScreen from './src/screens/Login';
import SignUpScreen from './src/screens/Signup';
import MainScreen from './src/screens/Main';
import CVScreen from './src/screens/CV';
import JobsListScreen from './src/screens/JobsList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserState from './contexts/UserState';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <UserState>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="JobsList" component={JobsListScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="CV" component={CVScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  );
}

export default App;