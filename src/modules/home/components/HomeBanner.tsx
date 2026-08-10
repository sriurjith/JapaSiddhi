import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../../../theme/colors';
import {HomeBanner as HomeBannerModel} from '../types/home';

interface Props {
  banner?: HomeBannerModel;
  onPress?: () => void;
}

const HomeBanner: React.FC<Props> = ({
  banner,
  onPress,
}) => {
  const bannerSource =
    banner?.imageUrl && banner.imageUrl.trim() !== ''
      ? {uri: banner.imageUrl}
      : require('../../../assets/images/home_banner.webp');

  return (
    <ImageBackground
      source={bannerSource}
      resizeMode="cover"
      imageStyle={styles.image}
      style={styles.container}>

      <View style={styles.overlay}>

        <Text style={styles.title}>
          {banner?.title || 'Welcome to Japa Siddhi'}
        </Text>

        <Text style={styles.subtitle}>
          {banner?.subtitle ||
            'Begin your spiritual journey with daily mantra chanting and devotion.'}
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={onPress}>

          <Text style={styles.buttonText}>
            {banner?.buttonText || 'Start Japa'}
          </Text>

        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
};

export default HomeBanner;

const styles = StyleSheet.create({
  container: {
    height: 220,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
  },

  image: {
    borderRadius: 18,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  subtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 8,
    lineHeight: 22,
  },

  button: {
    alignSelf: 'flex-start',
    marginTop: 18,
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});