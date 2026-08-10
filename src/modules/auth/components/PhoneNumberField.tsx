import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';

import Colors from '../../../theme/colors';

interface PhoneNumberFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

const PhoneNumberField = ({
  value,
  onChangeText,
  placeholder = 'Enter Mobile Number',
  keyboardType = 'phone-pad',
  maxLength = 15,
}: PhoneNumberFieldProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        style={styles.input}
      />
    </View>
  );
};

export default PhoneNumberField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 18,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});