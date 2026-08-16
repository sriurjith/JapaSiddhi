import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

const OrdersScreen = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    apiService
      .get('/orders')
      .then(response => setOrders(response.data.data ?? []))
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load orders.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScreenLayout title="Orders & Tracking">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      {!loading && !error && orders.length === 0 ? (
        <Text style={styles.empty}>No orders yet.</Text>
      ) : null}
      {orders.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.productName || item.orderNumber || `Order #${item.id}`}</Text>
          <Text style={styles.meta}>
            {item.orderStatus || item.status} · {item.paymentStatus || ''}
          </Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default OrdersScreen;

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
