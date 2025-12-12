import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import PropTypes from 'prop-types';

import { COLORS, FREQUENCIES, DAY_OPTIONS } from '../../constants';
import { formatTime } from '../../utils';

export default function TimeDataPicker({
  frequency,
  dayNotification,
  timeNotification,
  setDayNotification,
  setTimeNotification,
}) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayNotification || '-');
  const [displayTime, setDisplayTime] = useState(timeNotification || null);

  const handleTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);

    const formattedTime = formatTime(currentDate);
    setDisplayTime(formattedTime);
    setTimeNotification(formattedTime);

    if (frequency === FREQUENCIES.DAILY) {
      setDayNotification(FREQUENCIES.DAILY);
    }
  };

  const handleDaySelect = () => {
    setDayNotification(selectedDay);
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  const isWeekly = frequency === FREQUENCIES.WEEKLY;
  const isDaily = frequency === FREQUENCIES.DAILY;

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={showTimePicker}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Select time</Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        {isDaily && (
          <Text style={styles.notificationText}>Habit Day: Daily</Text>
        )}

        {isWeekly && (
          <>
            <SelectList
              data={DAY_OPTIONS}
              search={false}
              setSelected={setSelectedDay}
              onSelect={handleDaySelect}
              placeholder={selectedDay}
              boxStyles={styles.boxStyle}
              inputStyles={styles.inputStyle}
              dropdownStyles={styles.dropdownStyle}
              dropdownItemStyles={styles.dropdownItemStyle}
              dropdownTextStyles={styles.dropdownTextStyle}
              arrowicon={
                <Image
                  source={require('../../../assets/icons/arrowDropdown.png')}
                  style={styles.arrow}
                />
              }
            />
            <Text style={styles.notificationText}>
              Habit Day: {dayNotification || selectedDay}
            </Text>
          </>
        )}

        {displayTime && (
          <Text style={styles.notificationText}>
            Habit time: {displayTime}
          </Text>
        )}
      </View>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

TimeDataPicker.propTypes = {
  frequency: PropTypes.string,
  dayNotification: PropTypes.string,
  timeNotification: PropTypes.string,
  setDayNotification: PropTypes.func.isRequired,
  setTimeNotification: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: COLORS.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    marginVertical: 20,
  },
  notificationText: {
    fontSize: 18,
    color: COLORS.text.primary,
    marginTop: 10,
  },
  boxStyle: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  inputStyle: {
    color: COLORS.text.primary,
  },
  dropdownStyle: {
    borderWidth: 0,
    maxHeight: 150,
  },
  dropdownItemStyle: {
    borderWidth: 1,
    borderColor: COLORS.text.secondary,
    borderRadius: 10,
    marginBottom: 15,
  },
  dropdownTextStyle: {
    color: COLORS.text.secondary,
  },
  arrow: {
    width: 20,
    height: 20,
  },
});
