import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

const ProgressScreen = () => {
  const [summary, setSummary] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    Promise.all([
      apiService.get('/japa/summary'),
      apiService.get('/japa-goals'),
    ])
      .then(([summaryResponse, goalsResponse]) => {
        setSummary(summaryResponse.data.data);
        setGoals(goalsResponse.data.data ?? []);
      })
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load progress from the API.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ScreenLayout title="My Progress">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      {summary ? (
        <View style={styles.card}>
          <Text style={styles.stat}>Today: {summary.todayJapaCount ?? 0}</Text>
          <Text style={styles.stat}>Weekly: {summary.weeklyJapaCount ?? 0}</Text>
          <Text style={styles.stat}>Monthly: {summary.monthlyJapaCount ?? 0}</Text>
          <Text style={styles.stat}>Lifetime: {summary.totalJapaCount ?? 0}</Text>
          <Text style={styles.stat}>Global: {summary.globalJapaCount ?? 0}</Text>
        </View>
      ) : null}
      {goals.map(goal => (
        <View key={goal.id} style={styles.card}>
          <Text style={styles.name}>{goal.goalName}</Text>
          <Text style={styles.meta}>
            {goal.completedCount} / {goal.targetCount} · {goal.status}
          </Text>
          <Text style={styles.meta}>Daily target: {goal.dailyTarget}</Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default ProgressScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  stat: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
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
