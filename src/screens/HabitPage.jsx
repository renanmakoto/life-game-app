import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

import NotificationService from '../services/NotificationService';
import HabitsService from '../services/HabitsService';
import SelectHabit from '../components/habit/SelectHabit';
import SelectFrequency from '../components/habit/SelectFrequency';
import Notification from '../components/habit/Notification';
import TimeDataPicker from '../components/habit/TimeDataPicker';
import UpdateDeleteButtons from '../components/habit/UpdateDeleteButtons';
import DefaultButton from '../components/common/DefaultButton';
import { COLORS, FREQUENCIES, ROUTES, PROGRESS } from '../constants';
import { formatDate } from '../utils';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HabitPage({ route }) {
  const navigation = useNavigation();
  const { create, habit } = route.params;

  const [habitInput, setHabitInput] = useState(undefined);
  const [frequencyInput, setFrequencyInput] = useState(undefined);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [dayNotification, setDayNotification] = useState(null);
  const [timeNotification, setTimeNotification] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  const validateInputs = () => {
    if (!habitInput || !frequencyInput) {
      Alert.alert('Validation Error', 'Please select a habit and frequency to continue.');
      return false;
    }

    if (notificationToggle && !timeNotification) {
      Alert.alert('Validation Error', 'Please set the notification time.');
      return false;
    }

    if (notificationToggle && frequencyInput === FREQUENCIES.WEEKLY && !dayNotification) {
      Alert.alert('Validation Error', 'Please select a day for weekly notifications.');
      return false;
    }

    return true;
  };

  const handleCreateHabit = async () => {
    if (!validateInputs()) return;

    try {
      if (notificationToggle && frequencyInput !== FREQUENCIES.MONTHLY) {
        await NotificationService.createNotification(
          habitInput,
          frequencyInput,
          dayNotification,
          timeNotification
        );
      }

      await HabitsService.createHabit({
        habitArea: habit?.habitArea,
        habitName: habitInput,
        habitFrequency: frequencyInput,
        habitHasNotification: notificationToggle,
        habitNotificationFrequency: dayNotification,
        habitNotificationTime: timeNotification,
        lastCheck: formatDate(),
        daysWithoutChecks: 0,
        habitIsChecked: false,
        progressBar: PROGRESS.FULL,
        habitChecks: 0,
      });

      Alert.alert('Success', 'Habit created successfully!');
      navigation.navigate(ROUTES.HOME, {
        createdHabit: `Created in ${habit?.habitArea}`,
      });
    } catch (error) {
      console.error('Error creating habit:', error);
      Alert.alert('Error', 'Failed to create habit. Please try again.');
    }
  };

  const handleUpdateHabit = async () => {
    if (notificationToggle && !dayNotification && !timeNotification) {
      Alert.alert('Validation Error', 'Please set the notification frequency and time.');
      return;
    }

    try {
      await HabitsService.updateHabit({
        habitArea: habit?.habitArea,
        habitName: habitInput,
        habitFrequency: frequencyInput,
        habitHasNotification: notificationToggle,
        habitNotificationFrequency: dayNotification,
        habitNotificationTime: timeNotification,
      });

      try {
        await NotificationService.deleteNotification(habit?.habitName);
      } catch (e) {
      }

      if (notificationToggle && frequencyInput !== FREQUENCIES.MONTHLY) {
        await NotificationService.createNotification(
          habitInput,
          frequencyInput,
          dayNotification,
          timeNotification
        );
      }

      Alert.alert('Success', 'Habit updated successfully!');
      navigation.navigate(ROUTES.HOME, {
        updatedHabit: `Updated in ${habit?.habitArea}`,
      });
    } catch (error) {
      console.error('Error updating habit:', error);
      Alert.alert('Error', 'Failed to update habit. Please try again.');
    }
  };

  useEffect(() => {
    if (habit?.habitHasNotification === 1) {
      setNotificationToggle(true);
      setDayNotification(habit?.habitNotificationFrequency);
      setTimeNotification(habit?.habitNotificationTime);
    }
  }, [habit]);

  useEffect(() => {
    if (!notificationToggle) {
      setTimeNotification(null);
      setDayNotification(null);
    }
  }, [notificationToggle]);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Notification response:', response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const showNotificationSettings = frequencyInput !== FREQUENCIES.MONTHLY;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../assets/icons/arrowBack.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <View style={styles.mainContent}>
            <Text style={styles.title}>Habit Settings</Text>

            <Text style={styles.label}>Area</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.areaText}>{habit?.habitArea}</Text>
            </View>

            <Text style={styles.label}>Habit</Text>
            <SelectHabit habit={habit} habitInput={setHabitInput} />

            <Text style={styles.label}>Frequency</Text>
            <SelectFrequency
              habitFrequency={habit?.habitFrequency}
              frequencyInput={setFrequencyInput}
            />

            {showNotificationSettings && (
              <Notification
                notificationToggle={notificationToggle}
                setNotificationToggle={setNotificationToggle}
              />
            )}

            {notificationToggle && showNotificationSettings && (
              <TimeDataPicker
                frequency={frequencyInput}
                dayNotification={dayNotification}
                timeNotification={timeNotification}
                setDayNotification={setDayNotification}
                setTimeNotification={setTimeNotification}
              />
            )}

            {create === false ? (
              <UpdateDeleteButtons
                handleUpdate={handleUpdateHabit}
                habitArea={habit?.habitArea}
                habitInput={habitInput}
              />
            ) : (
              <View style={styles.createButtonContainer}>
                <DefaultButton
                  buttonText="Create"
                  handlePress={handleCreateHabit}
                  width={250}
                  height={50}
                />
              </View>
            )}
          </View>
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
  backButton: {
    width: 40,
    height: 40,
    margin: 25,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  mainContent: {
    width: 250,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.text.primary,
    fontSize: 30,
  },
  label: {
    color: COLORS.text.primary,
    fontSize: 16,
    marginTop: 35,
    marginBottom: 10,
    marginLeft: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  areaText: {
    color: COLORS.text.secondary,
    fontSize: 15,
  },
  createButtonContainer: {
    marginTop: 20,
  },
});
