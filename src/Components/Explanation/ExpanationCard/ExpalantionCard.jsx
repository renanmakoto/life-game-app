import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { COLORS, STATUS_ICONS } from '../../../constants';

const AreaExplanation = ({ icon, areaName, areaColor, description }) => (
  <View style={styles.explanationContainer}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.description}>
      <Text style={[styles.areaName, { color: areaColor }]}>{areaName}: </Text>
      {description}
    </Text>
  </View>
);

AreaExplanation.propTypes = {
  icon: PropTypes.number.isRequired,
  areaName: PropTypes.string.isRequired,
  areaColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function ExplanationCard() {
  const areas = [
    {
      icon: STATUS_ICONS.education,
      areaName: 'Mind',
      areaColor: COLORS.habit.mind,
      description: 'Improve your intelligence and mindset',
    },
    {
      icon: STATUS_ICONS.money,
      areaName: 'Finance',
      areaColor: COLORS.habit.finance,
      description: 'Help your financial life',
    },
    {
      icon: STATUS_ICONS.body,
      areaName: 'Body',
      areaColor: COLORS.habit.body,
      description: 'Be healthier and stronger',
    },
    {
      icon: STATUS_ICONS.fun,
      areaName: 'Mood',
      areaColor: COLORS.habit.mood,
      description: 'Handle stress and feel happier',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Through this App you will develop{'\n'}4 habits in 4 important areas:
      </Text>
      {areas.map((area) => (
        <AreaExplanation
          key={area.areaName}
          icon={area.icon}
          areaName={area.areaName}
          areaColor={area.areaColor}
          description={area.description}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    width: 350,
    borderRadius: 25,
    padding: 30,
  },
  title: {
    fontWeight: 'bold',
    color: COLORS.text.primary,
    textAlign: 'center',
    fontSize: 16,
  },
  explanationContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  areaName: {
    fontWeight: 'bold',
  },
  description: {
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
});