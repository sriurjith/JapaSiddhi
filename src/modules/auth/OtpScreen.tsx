import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import OTPInput from './components/OTPInput';
import ResendTimer from './components/ResendTimer';
import ContinueButton from './components/ContinueButton';
import apiService from '../../services/apiService';
import {saveSession} from '../../services/session';

import Colors from '../../theme/colors';

const OtpScreen = ({route, navigation}: any) => {
  const {
    phoneNumber,
    mobileCountryCode,
    mobileNumber,
    email,
    sentTo,
  } = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const goAfterVerify = async (data: any) => {
    if (data?.token && data?.user) {
      await saveSession(data.token, data.user);
      const profileCompleted = [1, '1', true, 'true'].includes(
        data.user?.profileCompleted ?? data.user?.profile_completed,
      );

      if (profileCompleted) {
        navigation.replace('Home');
        return;
      }
    }

    navigation.replace('CompleteProfile', {
      phoneNumber,
      mobileCountryCode,
      mobileNumber,
      email,
    });
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.post('/auth/otp/verify', {
        mobileCountryCode,
        mobileNumber,
        otp,
      });
      await goAfterVerify(response.data.data);
    } catch (error: any) {
      Alert.alert(
        'Verification Failed',
        error?.response?.data?.message || 'OTP verification failed.',
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      const response = await apiService.post('/auth/otp/send', {
        mobileCountryCode,
        mobileNumber,
        email,
      });
      setOtp('');
      Alert.alert(
        'OTP Sent',
        `A new verification code was sent to ${response.data?.data?.sentTo || email}.`,
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Unable to resend OTP.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the verification code sent to
      </Text>
      <Text style={styles.mobile}>{sentTo || email || phoneNumber}</Text>

      <OTPInput value={otp} onChange={setOtp} />
      <ResendTimer onResend={resendOTP} />

      <View style={{marginTop: 40}}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <ContinueButton title="Verify OTP" onPress={verifyOTP} />
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
