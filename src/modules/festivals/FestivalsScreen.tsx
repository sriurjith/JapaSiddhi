import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

interface Festival {
  id: number;
  festivalName: string;
  description: string;
  festivalDate: string;
  festivalType: string;
}

const FestivalsScreen = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    apiService
      .get('/festivals')
      .then(response => setFestivals(response.data.data ?? []))
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load festivals from the API.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScreenLayout title="Festivals">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      {festivals.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.date}>{String(item.festivalDate).slice(0, 10)}</Text>
          <Text style={styles.name}>{item.festivalName}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default FestivalsScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  date: {
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  description: {
    marginTop: 6,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  error: {
    color: Colors.error,
  },
});
