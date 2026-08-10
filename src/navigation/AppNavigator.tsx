import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../modules/auth/SplashScreen';
import LoginScreen from '../modules/auth/LoginScreen';
import OtpScreen from '../modules/auth/OtpScreen';
import CompleteProfileScreen from '../modules/auth/CompleteProfileScreen';
import HomeScreen from '../modules/home/screens/HomeScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;

  OtpScreen: {
    phoneNumber: string;
  };

  CompleteProfile: undefined;

  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
        />

        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;