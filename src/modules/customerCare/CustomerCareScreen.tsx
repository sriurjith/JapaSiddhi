import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
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

const CustomerCareScreen = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState<any[]>([]);
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
      .get('/customer-care')
      .then(response => setTickets(response.data.data ?? []))
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load tickets.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!subject.trim() || !message.trim()) {
      setStatus('Subject and message are required.');
      return;
    }
    setSaving(true);
    try {
      await apiService.post('/customer-care', {
        subject: subject.trim(),
        message: message.trim(),
      });
      setStatus('Ticket raised.');
      setSubject('');
      setMessage('');
      load();
    } catch (err: any) {
      setStatus(getApiError(err, 'Could not raise the ticket.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenLayout title="Customer Care">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={load} />
      ) : null}
      <TextInput style={styles.input} placeholder="Subject *" value={subject} onChangeText={setSubject} />
      <TextInput
        style={[styles.input, styles.area]}
        placeholder="Message *"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={submit} disabled={saving}>
        <Text style={styles.buttonText}>{saving ? 'Sending...' : 'Raise Ticket'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL('https://wa.me/917349483937')}>
        <Text style={styles.linkText}>WhatsApp Support</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => Linking.openURL('tel:+917349483937')}>
        <Text style={styles.linkText}>Call Support</Text>
      </TouchableOpacity>
      {status ? <Text style={styles.meta}>{status}</Text> : null}
      {tickets.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.name}>{item.subject}</Text>
          <Text style={styles.meta}>{item.status} · {item.message}</Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default CustomerCareScreen;

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
  link: {paddingVertical: 8},
  linkText: {color: Colors.primary, fontWeight: '700'},
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
