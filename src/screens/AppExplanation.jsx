import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DefaultButton from '../components/common/DefaultButton';
import ExplanationCard from '../components/explanation/ExplanationCard';
import ChangeNavigationService from '../services/ChangeNavigationService';
import { COLORS, ROUTES } from '../constants';
import { formatDate } from '../utils';

export default function AppExplanation() {
  const navigation = useNavigation();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleContinue = async () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    const appStartData = formatDate();

    try {
      await ChangeNavigationService.setShowHome({
        showHome: 'true',
        appStartData,
      });
      navigation.navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Error saving navigation state:', error);
      navigation.navigate(ROUTES.HOME);
    } finally {
      setIsNavigating(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Let me explain{'\n'}it to you, first...
          </Text>
          
          <ExplanationCard />
          
          <Text style={styles.ctaText}>
            Are you ready to level up in life?
          </Text>
          <Text style={styles.description}>
            On the next screen you will be able to choose{'\n'}your 4 habits individually.
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
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginVertical: 40,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
});
