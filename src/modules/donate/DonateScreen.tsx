import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
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

const DonateScreen = () => {
  const [amount, setAmount] = useState('200');
  const [details, setDetails] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [rawError, setRawError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setError('');
    setRawError(null);
    const [payment, donations] = await Promise.all([
      apiService.get('/donations/payment-details'),
      apiService.get('/donations/history'),
    ]);
    setDetails(payment.data.data);
    setHistory(donations.data.data ?? []);
  };

  const reload = () => {
    setLoading(true);
    load()
      .catch(err => {
        setRawError(err);
        setError(getApiError(err, 'Could not load donation details.'));
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const donate = async () => {
    const value = Number(amount);
    if (!value) {
      setMessage('Enter a valid amount.');
      return;
    }
    setSaving(true);
    try {
      await apiService.post('/donations', {
        donationType: 'ANNADANAM',
        amount: value,
        paymentMethod: 'UPI',
        remarks: 'App donation',
      });
      setMessage(`Donation of ₹${value} saved.`);
      await load();
    } catch (error: any) {
      setMessage(error?.response?.data?.message ?? 'Donation failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenLayout title="Annadanam">
      {loading ? <ActivityIndicator color={Colors.primary} /> : null}
      {error ? (
        <ApiErrorPanel error={error} rawError={rawError} onRetry={reload} />
      ) : null}
      <View style={styles.card}>
        <Text style={styles.scanTitle}>Scan to pay</Text>
        <Text style={styles.trustName}>Bilva Patra Trust</Text>
        <Image
          source={require('../../assets/images/phonepe_upi_qr.png')}
          style={styles.qr}
          resizeMode="contain"
        />
        <Text style={styles.scanHint}>
          Open PhonePe, GPay, or any UPI app and scan this QR
        </Text>
        {details?.upiId ? (
          <View style={styles.details}>
            <Text style={styles.label}>UPI ID</Text>
            <Text style={styles.value}>{details.upiId}</Text>
            {details.accountHolderName || details.bankName ? (
              <>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.value}>
                  {[details.accountHolderName, details.bankName]
                    .filter(Boolean)
                    .join(' · ')}
                </Text>
              </>
            ) : null}
            {details.accountNumber && details.ifscCode ? (
              <Text style={styles.value}>
                {details.accountNumber} · {details.ifscCode}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
      />
      <TouchableOpacity style={styles.button} onPress={donate} disabled={saving}>
        <Text style={styles.buttonText}>
          {saving ? 'Saving...' : 'Donate Now'}
        </Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Text style={styles.section}>History</Text>
      {history.map(item => (
        <View key={item.id} style={styles.historyCard}>
          <Text style={styles.value}>
            ₹{item.amount} · {item.donationType}
          </Text>
          <Text style={styles.meta}>
            {item.donationStatus} · {String(item.donatedAt || '').slice(0, 10)}
          </Text>
        </View>
      ))}
    </ScreenLayout>
  );
};

export default DonateScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    alignItems: 'center',
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  trustName: {
    marginTop: 6,
    color: Colors.secondary,
    fontWeight: '700',
  },
  qr: {
    width: 240,
    height: 280,
    marginVertical: 12,
  },
  scanHint: {
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  details: {
    width: '100%',
    marginTop: 8,
  },
  label: {
    color: Colors.textSecondary,
    marginTop: 8,
  },
  value: {
    color: Colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
  },
  message: {
    marginTop: 12,
    color: Colors.textSecondary,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '700',
  },
  historyCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  meta: {
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
