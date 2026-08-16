import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import apiService, {getApiError} from '../../services/apiService';
import Colors from '../../theme/colors';
import ApiErrorPanel from '../common/ApiErrorPanel';
import ScreenLayout from '../common/ScreenLayout';

const FeedbackScreen = () => {
  const [rating, setRating] = useState('5');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    setError('');
    setRawError(null);
    apiService
      .get('/feedback')
      .then(response => setItems(response.data.data ?? []))
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load feedback.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    const stars = Number(rating);
    if (!title.trim() || !message.trim() || stars < 1 || stars > 5) {
      setStatus('Enter a title, comment, and rating from 1 to 5.');
      return;
    }
    setSaving(true);
    try {
      await apiService.post('/feedback', {
        rating: stars,
        title: title.trim(),
        message: message.trim(),
      });
      setStatus('Feedback submitted.');
      setTitle('');
      setMessage('');
      load();
    } catch (err: any) {
      setStatus(getApiError(err, 'Could not submit feedback.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenLayout title="Feedback">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      <TextInput style={styles.input} placeholder="Rating 1-5 *" value={rating} onChangeText={setRating} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Title *" value={title} onChangeText={setTitle} />
      <TextInput
        style={[styles.input, styles.area]}
        placeholder="Feedback comments *"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={submit} disabled={saving}>
        <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Submit Feedback'}</Text>
      </TouchableOpacity>
      {status ? <Text style={styles.meta}>{status}</Text> : null}
      {items.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.title} · {item.rating}★</Text>
          <Text style={styles.meta}>{item.message}</Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    fontSize: 16,
  },
  area: {minHeight: 90, textAlignVertical: 'top'},
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {color: Colors.white, fontWeight: '700'},
  meta: {marginTop: 6, color: Colors.textSecondary},
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  name: {fontSize: 16, fontWeight: '700', color: Colors.textPrimary},
});
