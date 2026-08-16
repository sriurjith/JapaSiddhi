import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

const NotificationsScreen = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    apiService
      .get('/notifications')
      .then(response => setItems(response.data.data ?? []))
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load notifications.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScreenLayout title="Notifications">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      {!loading && !error && items.length === 0 ? (
        <Text style={styles.empty}>No notifications yet.</Text>
      ) : null}
      {items.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.meta}>{item.message || item.body}</Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  empty: {color: Colors.textSecondary},
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  name: {fontSize: 16, fontWeight: '700', color: Colors.textPrimary},
  meta: {marginTop: 6, color: Colors.textSecondary},
});
