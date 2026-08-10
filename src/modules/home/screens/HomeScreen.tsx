import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import HomeBanner from '../components/HomeBanner';
import GlobalJapaCount from '../components/GlobalJapaCount';
import QuickActionsGrid from '../components/QuickActionsGrid';

import {fetchHomeData} from '../redux/homeThunk';

import Colors from '../../../theme/colors';

import {AppDispatch, RootState} from '../../../redux/store';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {homeData, loading, error} = useSelector(
    (state: RootState) => state.home,
  );

  useEffect(() => {
    dispatch(fetchHomeData())
      .unwrap()
      .then(data => {
        console.log('✅ HOME API SUCCESS');
        console.log(data);
      })
      .catch(err => {
        console.log('❌ HOME API ERROR');
        console.log(err);
      });
  }, [dispatch]);

  console.log('Home Data:', homeData);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const onRefresh = () => {
    dispatch(fetchHomeData());
  };

  const handleNavigation = (route: string) => {
    console.log(route);
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

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text
          style={{
            color: 'red',
            fontSize: 16,
            marginBottom: 10,
          }}>
          API Error
        </Text>

        <Text
          style={{
            textAlign: 'center',
            marginHorizontal: 20,
          }}>
          {error}
        </Text>
      </View>
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
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
          tintColor={Colors.primary}
        />
      }>
      <View style={styles.content}>
        <HomeBanner
          banner={homeData.banner}
          onPress={() => {}}
        />

        <GlobalJapaCount
          data={homeData.globalJapaCount}
        />

        <QuickActionsGrid
          actions={homeData.quickActions}
          onPress={handleNavigation}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
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
});