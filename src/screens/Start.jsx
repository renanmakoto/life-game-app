import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DefaultButton from '../components/common/DefaultButton';
import LifeStatus from '../components/common/LifeStatus';
import { COLORS, ROUTES } from '../constants';

export default function Start() {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate(ROUTES.APP_EXPLANATION);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/icons/image0.png')}
            style={styles.logo}
          />
          <LifeStatus />
          <Text style={styles.description}>
            Let's have a better life{'\n'}as if you were playing a game!
          </Text>
          <DefaultButton
            buttonText="Continue"
            handlePress={handleContinue}
            width={250}
            height={50}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 80,
    marginTop: 60,
    marginBottom: 20,
  },
  description: {
    color: COLORS.text.primary,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 60,
  },
});
