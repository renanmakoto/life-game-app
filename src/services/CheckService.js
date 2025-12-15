import db from '../storage/database';
import HabitsService from './HabitsService';
import { 
  TABLES, 
  FREQUENCIES, 
  PROGRESS, 
  DECAY_THRESHOLDS, 
  REMOVE_CHECK_THRESHOLDS 
} from '../constants';
import { getDaysDifference } from '../utils';

const checkHabit = ({ lastCheck, habitIsChecked, habitChecks, habitArea }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${TABLES.HABITS} SET lastCheck = ?, habitIsChecked = ?, habitChecks = ? WHERE habitArea = ?;`,
        [lastCheck, habitIsChecked, habitChecks, habitArea],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(rowsAffected);
          } else {
            reject(new Error('Failed to check habit'));
          }
        },
        (_, error) => {
          console.error('Error checking habit:', error);
          reject(error);
        }
      );
    });
  });
};

const removeCheckHabit = ({ habitIsChecked, habitArea }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${TABLES.HABITS} SET habitIsChecked = ? WHERE habitArea = ?;`,
        [habitIsChecked, habitArea],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(rowsAffected);
          } else {
            reject(new Error('Failed to remove habit check'));
          }
        },
        (_, error) => {
          console.error('Error removing habit check:', error);
          reject(error);
        }
      );
    });
  });
};

const shouldRemoveCheck = (habit) => {
  if (!habit?.lastCheck || !habit?.habitFrequency) {
    return false;
  }

  const daysSinceCheck = getDaysDifference(habit.lastCheck);
  const threshold = REMOVE_CHECK_THRESHOLDS[habit.habitFrequency];

  return threshold !== undefined && daysSinceCheck > threshold;
};

const removeCheck = (mindHabit, moneyHabit, bodyHabit, funHabit) => {
  const habits = [mindHabit, moneyHabit, bodyHabit, funHabit];

  habits.forEach((habit) => {
    if (habit && shouldRemoveCheck(habit)) {
      removeCheckHabit({
        habitIsChecked: 0,
        habitArea: habit.habitArea,
      }).catch((err) => console.error('Error removing check:', err));
    }
  });
};

const calculateProgress = (daysDiff, frequency) => {
  const thresholds = DECAY_THRESHOLDS[frequency];
  
  if (!thresholds) {
    return null;
  }

  if (daysDiff >= thresholds.empty) {
    return PROGRESS.EMPTY;
  } else if (daysDiff >= thresholds.quarter) {
    return PROGRESS.QUARTER;
  } else if (daysDiff >= thresholds.half) {
    return PROGRESS.HALF;
  }

  return null;
};

const updateHabitProgress = (habit) => {
  if (!habit?.lastCheck || !habit?.habitFrequency || !habit?.habitArea) {
    return;
  }

  const daysDiff = getDaysDifference(habit.lastCheck);
  const newProgress = calculateProgress(daysDiff, habit.habitFrequency);

  if (newProgress !== null) {
    HabitsService.changeProgress({
      progressBar: newProgress,
      habitArea: habit.habitArea,
    }).catch((err) => console.error('Error updating progress:', err));
  }
};

const checkStatus = (mindHabit, moneyHabit, bodyHabit, funHabit) => {
  const habits = [mindHabit, moneyHabit, bodyHabit, funHabit];

  habits.forEach((habit) => {
    if (habit) {
      updateHabitProgress(habit);
    }
  });
};

export default {
  checkHabit,
  removeCheckHabit,
  removeCheck,
  checkStatus,
};
