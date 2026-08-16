import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

const FamilyJapaScreen = () => {
  const [family, setFamily] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    apiService
      .get('/family')
      .then(response => setFamily(response.data.data))
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load family japa from the API.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const members = family?.members ?? [];

  return (
    <ScreenLayout title="Family Japa">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      {family ? (
        <View style={styles.card}>
          <Text style={styles.name}>{family.familyName}</Text>
          <Text style={styles.meta}>{family.description}</Text>
          <Text style={styles.meta}>
            Today family count: {family.todayJapaCount ?? 0}
          </Text>
        </View>
      ) : null}
      {members.map((member: any) => (
        <View key={member.id} style={styles.card}>
          <Text style={styles.name}>{member.memberName}</Text>
          <Text style={styles.meta}>
            {member.relation} · {member.totalJapaCount ?? 0} chants
          </Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default FamilyJapaScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  meta: {
    marginTop: 6,
    color: Colors.textSecondary,
  },
  error: {
    color: Colors.error,
  },
});
