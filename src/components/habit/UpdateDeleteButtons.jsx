import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import HabitsService from '../../services/HabitsService';
import NotificationService from '../../services/NotificationService';
import { COLORS, ROUTES } from '../../constants';

export default function UpdateDeleteButtons({
  habitInput,
  handleUpdate,
  habitArea,
}) {
  const navigation = useNavigation();

  const handleDeleteHabit = async () => {
    try {
      await HabitsService.deleteByArea(habitArea);
      
      try {
        await NotificationService.deleteNotification(habitInput);
      } catch (e) {
      }
      
      Alert.alert('Success', 'Habit deleted successfully!');
      navigation.navigate(ROUTES.HOME, {
        deleteArea: habitArea,
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      Alert.alert('Error', 'Failed to delete habit. Please try again.');
    }
  };

  const confirmUpdate = () => {
    Alert.alert(
      'Update Habit',
      'Are you sure you want to update this habit? You can change the habit, frequency, and notification settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: handleUpdate },
      ]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Habit',
      'Are you sure you want to delete this habit? You will lose all progress and check history.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDeleteHabit },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.updateButton}
        activeOpacity={0.8}
        onPress={confirmUpdate}
      >
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        activeOpacity={0.8}
        onPress={confirmDelete}
      >
        <Image
          source={require('../../../assets/icons/trash.png')}
          style={styles.trashIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

UpdateDeleteButtons.propTypes = {
  habitInput: PropTypes.string,
  handleUpdate: PropTypes.func.isRequired,
  habitArea: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
  },
  updateButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 150,
    height: 50,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  updateButtonText: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: COLORS.status.error,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
  },
  trashIcon: {
    width: 25,
    height: 25,
  },
});
