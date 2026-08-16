import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../theme/colors';

import countries, {
  CountryItem,
} from '../../constants/countries';

import LoginHeader from './components/LoginHeader';
import CountryPickerField from './components/CountryPickerField';
import PhoneNumberField from './components/PhoneNumberField';
import ContinueButton from './components/ContinueButton';
import apiService from '../../services/apiService';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedCountry, setSelectedCountry] =
    useState<CountryItem>(
      countries.find(c => c.code === 'IN') ?? countries[0],
    );

  const handleContinue = async () => {
    const mobileNumber = phoneNumber.replace(/\D/g, '');
    const mobileCountryCode = selectedCountry.callingCode.replace(/\D/g, '');
    const trimmedEmail = email.trim().toLowerCase();

    if (mobileNumber.length < 6) {
      Alert.alert('Required', 'Please enter a valid mobile number.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      Alert.alert('Required', 'Enter a valid email. The free OTP is sent there.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiService.post('/auth/otp/send', {
        mobileCountryCode,
        mobileNumber,
        email: trimmedEmail,
      });

      navigation.navigate('OtpScreen', {
        phoneNumber: `${mobileCountryCode}${mobileNumber}`,
        mobileCountryCode,
        mobileNumber,
        email: trimmedEmail,
        sentTo: response.data?.data?.sentTo,
      });
    } catch (error: any) {
      Alert.alert(
        'OTP Failed',
        error?.response?.data?.message || 'Unable to send OTP.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>
        <LoginHeader />

        <Text style={styles.hint}>
          Login or signup with your mobile number. A free OTP will be sent to your email.
        </Text>

        <CountryPickerField
          value={selectedCountry}
          onChange={setSelectedCountry}
        />

        <PhoneNumberField
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter Mobile Number *"
        />

        <TextInput
          style={styles.emailInput}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email Address *"
          placeholderTextColor={Colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <ContinueButton
          title={submitting ? 'Sending OTP...' : 'Continue'}
          onPress={handleContinue}
          disabled={
            phoneNumber.replace(/\D/g, '').length < 6 ||
            !EMAIL_REGEX.test(email.trim()) ||
            submitting
          }
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing you agree to our
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.linkText}>Terms & Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  hint: {
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  emailInput: {
    height: 55,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 18,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  footer: {
    marginTop: 35,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  linkText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
