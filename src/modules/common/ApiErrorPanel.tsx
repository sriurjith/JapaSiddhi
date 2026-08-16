import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {isAuthError} from '../../services/apiService';
import {logoutToLogin} from '../../services/logout';
import Colors from '../../theme/colors';

interface Props {
  error: string;
  rawError?: any;
  onRetry: () => void;
}

const ApiErrorPanel: React.FC<Props> = ({error, rawError, onRetry}) => {
  const navigation = useNavigation<any>();
  const authFailed = isAuthError(rawError) || isAuthError(error);

  const logout = async () => {
    await logoutToLogin(navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.error}>
        {authFailed
          ? 'Please login again to load this page.'
          : error}
      </Text>
      <TouchableOpacity style={styles.button} onPress={authFailed ? logout : onRetry}>
        <Text style={styles.buttonText}>{authFailed ? 'Go to Login' : 'Retry'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApiErrorPanel;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  error: {
    color: Colors.error,
    marginBottom: 12,
    lineHeight: 22,
  },
  button: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
