import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../../theme/colors';

import CountryPickerField from './components/CountryPickerField';
import StateSelector from './components/StateSelector';
import CitySelector from './components/CitySelector';
import LanguageSelector from './components/LanguageSelector';
import ContinueButton from './components/ContinueButton';

import {CountryItem} from '../../constants/countries';

interface StateModel {
  id: number;
  name: string;
}

interface CityModel {
  id: number;
  name: string;
}

interface Language {
  id: number;
  code: string;
  name: string;
  nativeName: string;
}

const CompleteProfileScreen = ({
  navigation,
  route,
}: any) => {
  const phoneNumber = route?.params?.phoneNumber ?? '';

  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] =
    useState<string | null>(null);

  const [fullName, setFullName] = useState('');

  const [email, setEmail] = useState('');

  const [gender, setGender] = useState('');

  const [dob, setDob] = useState(new Date());

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  const [country, setCountry] =
  useState<CountryItem | null>(null);

  const [stateModel, setStateModel] =
    useState<StateModel | null>(null);

  const [cityModel, setCityModel] =
    useState<CityModel | null>(null);

  const [language, setLanguage] =
    useState<Language | null>(null);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isNameValid = useMemo(() => {
    return /^[A-Za-z .'-]{3,50}$/.test(
      fullName.trim(),
    );
  }, [fullName]);

  const isEmailValid = useMemo(() => {
    if (email.trim() === '') {
      return true;
    }

    return emailRegex.test(email);
  }, [email]);

  const isDOBValid = useMemo(() => {
    return dob < new Date();
  }, [dob]);

  const isFormValid = useMemo(() => {
    return (
      isNameValid &&
      isEmailValid &&
      isDOBValid &&
      gender !== '' &&
      country !== null &&
    
      acceptedTerms
    );
  }, [
    isNameValid,
    isEmailValid,
    isDOBValid,
    gender,
    country,
    stateModel,
    cityModel,
    language,
    acceptedTerms,
  ]);

  const choosePhoto = () => {
    Alert.alert(
      'Profile Picture',
      'Profile picture is optional. Image Picker will be connected later.',
    );
  };

  const submitProfile = async () => {
  console.log({
    fullName,
    isNameValid,
    email,
    isEmailValid,
    gender,
    dob,
    isDOBValid,
    country,
    stateModel,
    cityModel,
    acceptedTerms,
    isFormValid,
  });

  if (!isFormValid) {
    Alert.alert(
      'Validation',
      JSON.stringify({
        isNameValid,
        isEmailValid,
        isDOBValid,
        gender,
        country: country !== null,
        stateModel: stateModel !== null,
        acceptedTerms,
      }),
    );
    return;
  }

  console.log('Going to Home');

navigation.navigate('Home');
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>

        <TouchableOpacity
          style={styles.profileContainer}
          onPress={choosePhoto}>

          {profileImage ? (
            <Image
              source={{uri: profileImage}}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileIcon}>
                👤
              </Text>
            </View>
          )}

          <Text style={styles.addPhoto}>
            Add Profile Picture (Optional)
          </Text>

        </TouchableOpacity>

        <Text style={styles.heading}>
          Complete Your Profile
        </Text>

        <Text style={styles.subHeading}>
          Please provide your details.
        </Text>

        <Text style={styles.label}>
          Full Name *
        </Text>

        <TextInput
          style={[
            styles.input,
            fullName.length > 0 &&
              !isNameValid &&
              styles.errorInput,
          ]}
          placeholder="Enter Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        {fullName.length > 0 &&
          !isNameValid && (
            <Text style={styles.errorText}>
              Enter a valid name.
            </Text>
        )}

        <Text style={styles.label}>
          Email Address
        </Text>

        <TextInput
          style={[
            styles.input,
            email.length > 0 &&
              !isEmailValid &&
              styles.errorInput,
          ]}
          placeholder="Enter Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {email.length > 0 &&
          !isEmailValid && (
            <Text style={styles.errorText}>
              Invalid email address.
            </Text>
          )}

        <Text style={styles.label}>
          Mobile Number
        </Text>

        <TextInput
          style={[
            styles.input,
            styles.disabledInput,
          ]}
          editable={false}
          value={phoneNumber}
        />

        <Text style={styles.label}>
          Gender *
        </Text>

        <View style={styles.pickerContainer}>

          <Picker
            selectedValue={gender}
            onValueChange={setGender}>

            <Picker.Item
              label="Select Gender"
              value=""
            />

            <Picker.Item
              label="Male"
              value="Male"
            />

            <Picker.Item
              label="Female"
              value="Female"
            />

            <Picker.Item
              label="Other"
              value="Other"
            />

            <Picker.Item
              label="Prefer Not To Say"
              value="Prefer Not To Say"
            />

          </Picker>

        </View>
                <Text style={styles.label}>
          Date of Birth *
        </Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() =>
            setShowDatePicker(true)
          }>

          <Text style={styles.dateText}>
            {dob.toDateString()}
          </Text>

        </TouchableOpacity>

        {showDatePicker && (

          <DateTimePicker
            value={dob}
            mode="date"
            maximumDate={new Date()}
            onChange={(
              event,
              selectedDate,
            ) => {
              setShowDatePicker(false);

              if (selectedDate) {
                setDob(selectedDate);
              }
            }}
          />

        )}

        <Text style={styles.label}>
          Country *
        </Text>

       <CountryPickerField
  value={
    country ?? {
      code: '',
      name: 'Select Country',
      flag: '🌍',
      callingCode: '',
    }
  }
  onChange={(item: CountryItem) => {
    setCountry(item);
    setStateModel(null);
    setCityModel(null);
  }}
/>

        <Text style={styles.label}>
          State 
        </Text>

        <StateSelector
  country={country}
  value={stateModel}
  onChange={(item: StateModel) => {
    console.log('Parent received state:', item);

    setStateModel(item);
    setCityModel(null);
  }}
/>

        <Text style={styles.label}>
          City 
        </Text>

        <CitySelector
          state={stateModel}
          value={cityModel}
          onChange={(item: CityModel) => {
  setCityModel(item);
}}
        />

        <Text style={styles.label}>
          Preferred Language 
        </Text>

        <LanguageSelector
          value={language}
          onChange={(item: Language) => {
  setLanguage(item);
}}
        />

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() =>
            setAcceptedTerms(
              !acceptedTerms,
            )
          }>

          <View
            style={[
              styles.checkbox,
              acceptedTerms &&
                styles.checkboxSelected,
            ]}>

            {acceptedTerms && (
              <Text style={styles.checkMark}>
                ✓
              </Text>
            )}

          </View>

          <Text style={styles.termsText}>
            I agree to the Terms of
            Service and Privacy Policy
          </Text>

        </TouchableOpacity>

        {loading ? (

          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />

        ) : (

          <ContinueButton
  title="Continue"
  onPress={submitProfile}
  disabled={false}
/>

        )}

        <View style={styles.bottomSpacing} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  profileContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  profilePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  profileIcon: {
    fontSize: 48,
  },

  addPhoto: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  subHeading: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 8,
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
    marginTop: 18,
  },

  input: {
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    justifyContent: 'center',
    fontSize: 16,
  },

  disabledInput: {
    backgroundColor: '#F7F7F7',
    color: '#666666',
  },

  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  dateText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },

  errorInput: {
    borderColor: '#E53935',
  },

  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginTop: 5,
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxSelected: {
    backgroundColor: Colors.primary,
  },

  checkMark: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  termsText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 22,
  },

  bottomSpacing: {
    height: 60,
  },
});