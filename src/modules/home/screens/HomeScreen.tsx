import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';

import {RootStackParamList} from '../../../navigation/AppNavigator';

import HomeBanner from '../components/HomeBanner';
import GlobalJapaCount from '../components/GlobalJapaCount';
import QuickActionsGrid from '../components/QuickActionsGrid';

import {fetchHomeData} from '../redux/homeThunk';

import Colors from '../../../theme/colors';
import ApiErrorPanel from '../../common/ApiErrorPanel';

import {AppDispatch, RootState} from '../../../redux/store';

const ACTION_ROUTES: Record<string, keyof RootStackParamList> = {
  CHANT: 'Chant',
  FAMILY_JAPA: 'FamilyJapa',
  DONATE: 'Donate',
  FESTIVALS: 'Festivals',
  JAPA_GOALS: 'Progress',
  PROFILE: 'Profile',
  BAANALINGAM: 'BanaLingam',
  NITHYA_HOMAM: 'NithyaHomam',
  ORDERS: 'Orders',
  CUSTOMER_CARE: 'CustomerCare',
};

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const {homeData, loading, error} = useSelector(
    (state: RootState) => state.home,
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchHomeData());
    }, [dispatch]),
  );

  console.log('Home Data:', homeData);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const onRefresh = () => {
    dispatch(fetchHomeData());
  };

  const openPage = (action?: string) => {
    const screen = ACTION_ROUTES[String(action || '').toUpperCase()] ?? 'Chant';
    console.log('Opening page:', action, '->', screen);
    navigation.navigate(screen);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />

        <Text style={styles.message}>
          Loading Home...
        </Text>
      </View>
    );
  }

  if (error && !homeData) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.errorContent}>
          <Text style={styles.pageTitle}>Home</Text>
          <ApiErrorPanel
            error={error}
            rawError={error}
            onRetry={() => dispatch(fetchHomeData())}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (!homeData) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No Home Data Received</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }>
        <TouchableOpacity
          style={styles.profileLink}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileLinkText}>Profile Menu</Text>
        </TouchableOpacity>
        <HomeBanner
          banner={homeData.banner}
          onPress={() => openPage(homeData.banner.buttonAction || 'CHANT')}
        />

        <GlobalJapaCount
          data={homeData.globalJapaCount}
        />

        <QuickActionsGrid
          actions={homeData.quickActions}
          onPress={openPage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scroll: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 80,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  message: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.primary,
  },

  errorContent: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },

  profileLink: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },

  profileLinkText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
});