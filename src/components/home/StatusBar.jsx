import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import PropTypes from 'prop-types';

import { COLORS, STATUS_ICONS } from '../../constants';

const StatusBarItem = ({ icon, progress, color }) => (
  <View style={styles.statusBarContainer}>
    <Image source={icon} style={styles.icon} />
    <ProgressBar
      style={styles.progress}
      progress={progress || 0}
      color={color}
    />
  </View>
);

export default function StatusBar({
  mindHabit,
  moneyHabit,
  bodyHabit,
  funHabit,
}) {
  return (
    <View style={styles.container}>
      <StatusBarItem
        icon={STATUS_ICONS.education}
        progress={mindHabit}
        color={COLORS.habit.mind}
      />
      <StatusBarItem
        icon={STATUS_ICONS.money}
        progress={moneyHabit}
        color={COLORS.habit.finance}
      />
      <StatusBarItem
        icon={STATUS_ICONS.body}
        progress={bodyHabit}
        color={COLORS.habit.body}
      />
      <StatusBarItem
        icon={STATUS_ICONS.fun}
        progress={funHabit}
        color={COLORS.habit.mood}
      />
    </View>
  );
}

StatusBar.propTypes = {
  mindHabit: PropTypes.number,
  moneyHabit: PropTypes.number,
  bodyHabit: PropTypes.number,
  funHabit: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background.secondary,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  statusBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  progress: {
    borderRadius: 10,
    width: 250,
    height: 8,
  },
});
