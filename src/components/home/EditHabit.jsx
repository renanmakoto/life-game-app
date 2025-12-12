import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import CheckService from '../../services/CheckService';
import { COLORS, HABIT_AREAS, HABIT_ICONS, ROUTES } from '../../constants';
import { formatDate } from '../../utils';

export default function EditHabit({ habit, checkColor }) {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [checkIcon, setCheckIcon] = useState(HABIT_ICONS[HABIT_AREAS.MIND]);

  const handleEdit = () => {
    navigation.navigate(ROUTES.HABIT_PAGE, {
      create: false,
      habit,
    });
  };

  const handleCheck = async () => {
    if (isChecked) return;

    try {
      await CheckService.checkHabit({
        lastCheck: formatDate(),
        habitIsChecked: 1,
        habitChecks: (habit?.habitChecks || 0) + 1,
        habitArea: habit?.habitArea,
      });
      setIsChecked(true);
    } catch (error) {
      console.error('Error checking habit:', error);
    }
  };

  useEffect(() => {
    setIsChecked(habit?.habitIsChecked === 1);
    
    if (habit?.habitArea && HABIT_ICONS[habit.habitArea]) {
      setCheckIcon(HABIT_ICONS[habit.habitArea]);
    }
  }, [habit]);

  const notificationText = habit?.habitNotificationTime
    ? `${habit.habitNotificationTime} - ${habit.habitFrequency}`
    : `No notification - ${habit?.habitFrequency}`;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.button}
      onPress={handleEdit}
    >
      <View style={styles.habitText}>
        <Text style={styles.habitTitle}>{habit?.habitName}</Text>
        <Text style={styles.habitFrequency}>{notificationText}</Text>
      </View>

      {!isChecked ? (
        <TouchableOpacity
          style={[styles.checkBox, { borderColor: checkColor }]}
          onPress={handleCheck}
          activeOpacity={0.7}
        />
      ) : (
        <TouchableOpacity onPress={handleCheck} activeOpacity={1}>
          <Image source={checkIcon} style={styles.checkedIcon} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

EditHabit.propTypes = {
  habit: PropTypes.object.isRequired,
  checkColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 5,
    width: 320,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  habitText: {
    flex: 1,
    marginRight: 10,
  },
  habitTitle: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
  habitFrequency: {
    color: COLORS.text.secondary,
    marginTop: 4,
  },
  checkBox: {
    borderRadius: 10,
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  checkedIcon: {
    width: 25,
    height: 25,
  },
});
