import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/AppNavigator';
import apiService from '../../services/apiService';
import {clearSession, hydrateSession, saveSession} from '../../services/session';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({navigation}: Props) => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      await new Promise<void>(resolve => {
        setTimeout(resolve, 1500);
      });

      const session = await hydrateSession();
      if (!session.token) {
        navigation.replace('Login');
        return;
      }

      const response = await apiService.get('/auth/profile');
      const user = response.data?.data;
      if (user) {
        await saveSession(session.token, user);
      }
      const profileCompleted =
        user?.profileCompleted === 1 ||
        user?.profileCompleted === true ||
        user?.profile_completed === 1;

      if (profileCompleted) {
        navigation.replace('Home');
        return;
      }

      navigation.replace('CompleteProfile', {
        phoneNumber: `${user?.mobileCountryCode || ''}${user?.mobileNumber || ''}`,
        mobileCountryCode: user?.mobileCountryCode,
        mobileNumber: user?.mobileNumber,
        email: user?.email,
      });
    } catch (error) {
      await clearSession();
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFDF7" barStyle="dark-content" />
      <Image
        source={require('../../assets/images/splash_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator
        size="large"
        color="#C9A227"
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '78%',
  },
  loader: {
    position: 'absolute',
    bottom: 70,
  },
});

export default SplashScreen;
