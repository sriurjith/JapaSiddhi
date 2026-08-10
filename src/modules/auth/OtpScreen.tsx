import React, { useState } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useAppDispatch } from '../../redux/hooks';
import { verifyOTPThunk } from './redux/authThunk';

import OTPInput from './components/OTPInput';
import ResendTimer from './components/ResendTimer';
import ContinueButton from './components/ContinueButton';

import firebaseAuthService from './services/firebaseAuthService';

import Colors from '../../theme/colors';

const OtpScreen = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();

  const { confirmation, phoneNumber } = route.params;

  const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert(
        'Invalid OTP',
        'Please enter valid OTP.',
      );
      return;
    }

    setLoading(true);

    const result = await dispatch(
      verifyOTPThunk({
        confirmation,
        otp,
      }),
    );

    setLoading(false);

    if (verifyOTPThunk.rejected.match(result)) {
      Alert.alert(
        'Verification Failed',
        (result.payload as string) ||
          'OTP verification failed.',
      );
      return;
    }

    // TODO:
    // Later we'll check if profile is completed.
    navigation.replace('CompleteProfile');
  };

  const resendOTP = async () => {
    const response =
      await firebaseAuthService.sendOTP(
        phoneNumber,
      );

    if (!response.success) {
      Alert.alert(
        'Error',
        response.message || 'Unable to resend OTP.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Verify OTP
      </Text>

      <Text style={styles.subtitle}>
        Enter the verification code sent to
      </Text>

      <Text style={styles.mobile}>
        {phoneNumber}
      </Text>

      <OTPInput
        value={otp}
        onChange={setOtp}
      />

      <ResendTimer
        onResend={resendOTP}
      />

      <View style={{ marginTop: 40 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />
        ) : (
          <ContinueButton
            title="Verify OTP"
            onPress={verifyOTP}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: Colors.background,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 35,
  },

  subtitle: {
    fontSize: 15,
    marginTop: 15,
    color: Colors.textSecondary,
  },

  mobile: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    color: Colors.primary,
  },
});