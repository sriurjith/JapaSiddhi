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

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({navigation}: Props) => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Show splash for 3 seconds
      await new Promise<void>(resolve => {
        setTimeout(resolve, 3000);
      });

      // TEMPORARY DEVELOPMENT FLOW
      // Splash -> Complete Profile -> Home
      navigation.replace('CompleteProfile');
    } catch (error) {
      console.log('Splash Initialization Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFDF7"
        barStyle="dark-content"
      />

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