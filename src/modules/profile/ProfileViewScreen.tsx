import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ProfileApi from '../auth/services/profileApi';
import {getStoredUser} from '../../services/session';
import {logoutToLogin} from '../../services/logout';
import {getApiError, isAuthError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

const ProfileViewScreen = () => {
  const navigation = useNavigation<any>();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);

  const logout = async () => {
    await logoutToLogin(navigation);
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete account',
      'This removes your login and personal profile. You cannot undo this.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await ProfileApi.deleteAccount();
              await logoutToLogin(navigation);
            } catch (err: any) {
              Alert.alert(
                'Delete failed',
                getApiError(err, 'Could not delete your account.'),
              );
            }
          },
        },
      ],
    );
  };

  const loadProfile = async () => {
    setLoading(true);
    setError('');
    setRawError(null);
    const stored = await getStoredUser();
    if (stored) {
      setProfile({
        fullName: stored.fullName || stored.full_name || 'Devotee',
        mobileNumber: stored.mobileNumber || stored.mobile_number || '',
        email: stored.email || '',
        cityName: stored.cityName || stored.city_name || '',
        stateName: stored.stateName || stored.state_name || '',
        countryName: stored.countryName || stored.country_name || '',
        preferredLanguageName:
          stored.preferredLanguageName || stored.preferred_language_name || '',
        maritalStatus: stored.maritalStatus || stored.marital_status || '',
        gothram: stored.gothram || '',
        nakshatram: stored.nakshatram || '',
      });
    }

    try {
      const data = await ProfileApi.getProfile();
      if (data) {
        setProfile(data);
        return;
      }
      if (!stored) {
        throw new Error('Profile not found');
      }
    } catch (err: any) {
      if (isAuthError(err)) {
        setRawError(err);
        setError(getApiError(err, 'Please login again to load this page.'));
        return;
      }
      if (!stored) {
        setProfile({
          fullName: 'Devotee',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const location = [profile?.cityName, profile?.stateName, profile?.countryName]
    .filter(Boolean)
    .join(', ');

  return (
    <ScreenLayout title="Profile">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={loadProfile} />
      ) : null}
      {profile ? (
        <>
          <View style={styles.card}>
            <Text style={styles.name}>{profile.fullName}</Text>
            {profile.mobileNumber ? (
              <Text style={styles.meta}>{profile.mobileNumber}</Text>
            ) : null}
            {profile.email ? <Text style={styles.meta}>{profile.email}</Text> : null}
            {location ? <Text style={styles.meta}>{location}</Text> : null}
            {profile.preferredLanguageName ? (
              <Text style={styles.meta}>
                Language: {profile.preferredLanguageName}
              </Text>
            ) : null}
            {profile.maritalStatus ? (
              <Text style={styles.meta}>Marital Status: {profile.maritalStatus}</Text>
            ) : null}
            {profile.gothram ? (
              <Text style={styles.meta}>Gothram: {profile.gothram}</Text>
            ) : null}
            {profile.nakshatram ? (
              <Text style={styles.meta}>Nakshatram: {profile.nakshatram}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.logoutText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.logoutText}>Order History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Feedback')}>
            <Text style={styles.logoutText}>Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Progress')}>
            <Text style={styles.logoutText}>My Progress</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.logoutText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteAccount}>
            <Text style={styles.logoutText}>Delete account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.7}
            onPress={() => {
              logout();
            }}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </ScreenLayout>
  );
};

export default ProfileViewScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  name: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  meta: {
    color: Colors.textSecondary,
    marginTop: 6,
    fontSize: 15,
  },
  error: {
    color: Colors.error,
    marginBottom: 12,
  },
  menuButton: {
    marginTop: 12,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: Colors.error,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
