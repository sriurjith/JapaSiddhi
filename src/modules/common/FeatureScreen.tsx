import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';

import Colors from '../../theme/colors';

export const FEATURE_PAGES: Record<
  string,
  {title: string; description: string}
> = {
  Chant: {
    title: 'Chant Japa',
    description:
      'Repeat sacred mantras, count your japa, and stay consistent in your daily sadhana.',
  },
  FamilyJapa: {
    title: 'Family Japa',
    description:
      'Invite family members, chant together, and grow your shared spiritual count.',
  },
  Donate: {
    title: 'Donate',
    description:
      'Support Bilva Patra Trust and contribute to seva, temples, and spiritual activities.',
  },
  Festivals: {
    title: 'Festivals',
    description:
      'See upcoming Hindu festivals and special japa events you can join.',
  },
  Progress: {
    title: 'My Progress',
    description:
      'Track your japa goals, daily targets, and how far you have come.',
  },
  Profile: {
    title: 'Profile',
    description:
      'View and update your personal details, language, and account settings.',
  },
};

const FeatureScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const content =
    FEATURE_PAGES[route.name] ?? {
      title: route.name,
      description: 'This page is ready for the next feature build.',
    };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.description}>{content.description}</Text>
      </View>
    </SafeAreaView>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 12,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.cream,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
});
