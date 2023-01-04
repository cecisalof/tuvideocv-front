import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/Splash';
import LogInScreen from './src/screens/Login';
import SignUpScreen from './src/screens/Signup';
import HomeScreen from './src/screens/Home';
import JobScreen from './src/screens/Jobs';
import MyApplicationsScreen from './src/screens/MyApplications';
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
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Jobs" component={JobScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="MyApplications" component={MyApplicationsScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  );
}

export default App;