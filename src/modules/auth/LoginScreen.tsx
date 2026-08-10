import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import Colors from '../../theme/colors';

import countries, {
  CountryItem,
} from '../../constants/countries';

import LoginHeader from './components/LoginHeader';
import CountryPickerField from './components/CountryPickerField';
import PhoneNumberField from './components/PhoneNumberField';
import ContinueButton from './components/ContinueButton';

import {AppDispatch} from '../../redux/store';
import {sendOTPThunk} from './redux/authThunk';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedCountry, setSelectedCountry] =
    useState<CountryItem>(
      countries.find(c => c.code === 'IN') ?? countries[0],
    );

  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = async () => {
    if (phoneNumber.trim().length < 6) {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid mobile number.',
      );
      return;
    }

    const fullPhoneNumber =
      `${selectedCountry.callingCode}${phoneNumber}`;

    const result = await dispatch(
      sendOTPThunk(fullPhoneNumber),
    );

    if (sendOTPThunk.fulfilled.match(result)) {
      navigation.navigate('OtpScreen', {
        phoneNumber: fullPhoneNumber,
        confirmation: result.payload.confirmation,
      });
    } else {
      Alert.alert(
        'OTP Failed',
        (result.payload as string) ||
          'Unable to send OTP.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>

        <LoginHeader />

        <CountryPickerField
          value={selectedCountry}
          onChange={setSelectedCountry}
        />

        <PhoneNumberField
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter Mobile Number"
        />

        <ContinueButton
          title="Continue"
          onPress={handleContinue}
          disabled={phoneNumber.trim().length < 6}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing you agree to our
          </Text>

          <Text style={styles.linkText}>
            Terms & Privacy Policy
          </Text>
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