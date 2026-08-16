import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './navigationRef';
import {withAuth} from '../modules/common/AuthGate';

import SplashScreen from '../modules/auth/SplashScreen';
import LoginScreen from '../modules/auth/LoginScreen';
import OtpScreen from '../modules/auth/OtpScreen';
import CompleteProfileScreen from '../modules/auth/CompleteProfileScreen';
import HomeScreen from '../modules/home/screens/HomeScreen';
import ChantScreen from '../modules/chant/ChantScreen';
import FamilyJapaScreen from '../modules/family/FamilyJapaScreen';
import DonateScreen from '../modules/donate/DonateScreen';
import FestivalsScreen from '../modules/festivals/FestivalsScreen';
import ProgressScreen from '../modules/progress/ProgressScreen';
import ProfileViewScreen from '../modules/profile/ProfileViewScreen';
import BanaLingamScreen from '../modules/banaLingam/BanaLingamScreen';
import NithyaHomamScreen from '../modules/homam/NithyaHomamScreen';
import OrdersScreen from '../modules/orders/OrdersScreen';
import CustomerCareScreen from '../modules/customerCare/CustomerCareScreen';
import NotificationsScreen from '../modules/notifications/NotificationsScreen';
import FeedbackScreen from '../modules/feedback/FeedbackScreen';
import PrivacyPolicyScreen from '../modules/legal/PrivacyPolicyScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OtpScreen: {
    phoneNumber: string;
    confirmation?: unknown;
    mobileCountryCode?: string;
    mobileNumber?: string;
    email?: string;
    sentTo?: string;
  };
  CompleteProfile: {
    phoneNumber?: string;
    email?: string;
    mobileCountryCode?: string;
    mobileNumber?: string;
  };
  Home: undefined;
  Chant: undefined;
  FamilyJapa: undefined;
  Donate: undefined;
  Festivals: undefined;
  Progress: undefined;
  Profile: undefined;
  BanaLingam: undefined;
  NithyaHomam: undefined;
  Orders: undefined;
  CustomerCare: undefined;
  Notifications: undefined;
  Feedback: undefined;
  PrivacyPolicy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProtectedHome = withAuth(HomeScreen);
const ProtectedChant = withAuth(ChantScreen);
const ProtectedFamily = withAuth(FamilyJapaScreen);
const ProtectedDonate = withAuth(DonateScreen);
const ProtectedFestivals = withAuth(FestivalsScreen);
const ProtectedProgress = withAuth(ProgressScreen);
const ProtectedProfile = withAuth(ProfileViewScreen);
const ProtectedBanaLingam = withAuth(BanaLingamScreen);
const ProtectedHomam = withAuth(NithyaHomamScreen);
const ProtectedOrders = withAuth(OrdersScreen);
const ProtectedCare = withAuth(CustomerCareScreen);
const ProtectedNotifications = withAuth(NotificationsScreen);
const ProtectedFeedback = withAuth(FeedbackScreen);

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Home" component={ProtectedHome} />
        <Stack.Screen name="Chant" component={ProtectedChant} />
        <Stack.Screen name="FamilyJapa" component={ProtectedFamily} />
        <Stack.Screen name="Donate" component={ProtectedDonate} />
        <Stack.Screen name="Festivals" component={ProtectedFestivals} />
        <Stack.Screen name="Progress" component={ProtectedProgress} />
        <Stack.Screen name="Profile" component={ProtectedProfile} />
        <Stack.Screen name="BanaLingam" component={ProtectedBanaLingam} />
        <Stack.Screen name="NithyaHomam" component={ProtectedHomam} />
        <Stack.Screen name="Orders" component={ProtectedOrders} />
        <Stack.Screen name="CustomerCare" component={ProtectedCare} />
        <Stack.Screen name="Notifications" component={ProtectedNotifications} />
        <Stack.Screen name="Feedback" component={ProtectedFeedback} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
