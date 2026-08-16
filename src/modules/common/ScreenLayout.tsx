import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../theme/colors';

interface Props {
  title: string;
  children: React.ReactNode;
}

const ScreenLayout: React.FC<Props> = ({title, children}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>‹ Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  scroll: {
    flex: 1,
  },
  backButton: {
    marginTop: 4,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  content: {
    paddingBottom: 48,
  },
});
