import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

interface Mantra {
  id: number;
  mantraName: string;
  deityName: string;
  transliteration: string;
  defaultJapaCount: number;
}

const ChantScreen = () => {
  const [mantras, setMantras] = useState<Mantra[]>([]);
  const [selected, setSelected] = useState<Mantra | null>(null);
  const [savedTotal, setSavedTotal] = useState(0);
  const [count, setCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    Promise.all([
      apiService.get('/mantras'),
      apiService.get('/japa/summary'),
    ])
      .then(([mantraResponse, summaryResponse]) => {
        const items = mantraResponse.data.data ?? [];
        setMantras(items);
        setSelected(current => current ?? items[0] ?? null);
        setSavedTotal(
          Number(summaryResponse.data.data?.totalJapaCount ?? 0) || 0,
        );
      })
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load mantras from the API.'));
      })
      .finally(() => setLoading(false));
  };

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, []),
  );

  const saveSession = async () => {
    if (!selected || count < 1) {
      setMessage('Tap the mala at least once before saving.');
      return;
    }

    setSaving(true);
    try {
      const response = await apiService.post('/japa/session', {
        mantraType: 'DEFAULT',
        mantraId: selected.id,
        chantMode: 'TAP',
        sessionCount: count,
        durationSeconds: count * 3,
      });
      const userTotal = Number(response.data.data?.userTotal ?? savedTotal + count);
      setSavedTotal(userTotal);
      setMessage(`Saved ${count} chants. Your total is now ${userTotal}.`);
      setCount(0);
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? 'Could not save the session.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ScreenLayout title="Chant Japa">
        <ActivityIndicator color={Colors.primary} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Chant Japa">
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      <Text style={styles.hint}>Choose a mantra, then tap to count.</Text>
      <View style={styles.chipRow}>
        {mantras.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.chip,
              selected?.id === item.id && styles.chipActive,
            ]}
            onPress={() => {
              setSelected(item);
              setMessage('');
            }}>
            <Text
              style={[
                styles.chipText,
                selected?.id === item.id && styles.chipTextActive,
              ]}>
              {item.mantraName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected ? (
        <View style={styles.card}>
          <Text style={styles.mantra}>{selected.transliteration}</Text>
          <Text style={styles.deity}>{selected.deityName}</Text>
          <Text style={styles.savedLabel}>Your saved count</Text>
          <Text style={styles.count}>{savedTotal + count}</Text>
          {count > 0 ? (
            <Text style={styles.sessionHint}>+{count} this session</Text>
          ) : null}
          <TouchableOpacity
            style={styles.tapButton}
            onPress={() => setCount(value => value + 1)}>
            <Text style={styles.tapText}>Tap to Chant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveSession}
            disabled={saving}>
            <Text style={styles.saveText}>
              {saving ? 'Saving...' : 'Save Session'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </ScreenLayout>
  );
};

export default ChantScreen;

const styles = StyleSheet.create({
  hint: {
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.cream,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
  },
  mantra: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  deity: {
    marginTop: 6,
    color: Colors.textSecondary,
  },
  savedLabel: {
    marginTop: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  count: {
    fontSize: 56,
    fontWeight: '700',
    color: Colors.primary,
    marginVertical: 8,
  },
  sessionHint: {
    color: Colors.secondary,
    fontWeight: '600',
    marginBottom: 8,
  },
  tapButton: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  tapText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 14,
  },
  saveText: {
    color: Colors.secondary,
    fontWeight: '700',
  },
  message: {
    marginTop: 16,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
