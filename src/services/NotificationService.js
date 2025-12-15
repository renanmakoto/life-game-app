import * as Notifications from 'expo-notifications';
import { FREQUENCIES, WEEKDAY_NUMBERS } from '../constants';
import { parseHour, parseMinutes } from '../utils';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const createTrigger = (frequency, day, time) => {
  const hour = parseHour(time);
  const minute = parseMinutes(time);

  if (frequency === FREQUENCIES.DAILY) {
    return {
      hour,
      minute,
      repeats: true,
    };
  }

  if (frequency === FREQUENCIES.WEEKLY) {
    const weekday = WEEKDAY_NUMBERS[day];
    return {
      weekday,
      hour,
      minute,
      repeats: true,
    };
  }

  return null;
};

const createNotification = async (habitName, frequency, day, time) => {
  try {
    const trigger = createTrigger(frequency, day, time);

    if (!trigger) {
      console.warn('No trigger created for notification');
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎯 Habit Reminder',
        body: habitName,
        sound: true,
      },
      identifier: habitName,
      trigger,
    });

    console.log('Notification scheduled:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

const deleteNotification = async (habitName) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(habitName);
    console.log('Notification cancelled:', habitName);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

const deleteAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log('All notifications cancelled');
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    throw error;
  }
};

const getAllScheduledNotifications = async () => {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    throw error;
  }
};

export default {
  createNotification,
  deleteNotification,
  deleteAllNotifications,
  getAllScheduledNotifications,
};
