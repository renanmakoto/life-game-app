import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import ChangeNavigationService from '../services/ChangeNavigationService';
import AllPages from './AllPages';
import HomePage from './HomePage';
import { COLORS } from '../constants';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={COLORS.text.primary} />
  </View>
);

export default function Routes() {
  const [showHome, setShowHome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkNavigationState = async () => {
      try {
        const result = await ChangeNavigationService.checkShowHome(1);
        setShowHome(result.showHome === 'true');
      } catch (error) {
        setShowHome(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkNavigationState();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return showHome ? <HomePage /> : <AllPages />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background.primary,
  },
});
