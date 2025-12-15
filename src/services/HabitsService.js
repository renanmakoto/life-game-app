import db from '../storage/database';
import { TABLES } from '../constants';

const initializeTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLES.HABITS} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          habitArea TEXT NOT NULL,
          habitName TEXT NOT NULL,
          habitFrequency TEXT NOT NULL,
          habitHasNotification BOOLEAN DEFAULT 0,
          habitNotificationFrequency TEXT,
          habitNotificationTime TEXT,
          lastCheck TEXT,
          daysWithoutChecks INTEGER DEFAULT 0,
          progressBar REAL DEFAULT 1,
          habitIsChecked BOOLEAN DEFAULT 0,
          habitChecks INTEGER DEFAULT 0
        );`,
        [],
        () => resolve(true),
        (_, error) => {
          console.error('Error creating habits table:', error);
          reject(error);
        }
      );
    });
  });
};

const createHabit = (habit) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${TABLES.HABITS} (
          habitArea,
          habitName,
          habitFrequency,
          habitHasNotification,
          habitNotificationFrequency,
          habitNotificationTime,
          lastCheck,
          daysWithoutChecks,
          progressBar,
          habitIsChecked,
          habitChecks
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          habit.habitArea,
          habit.habitName,
          habit.habitFrequency,
          habit.habitHasNotification ? 1 : 0,
          habit.habitNotificationFrequency,
          habit.habitNotificationTime,
          habit.lastCheck,
          habit.daysWithoutChecks || 0,
          habit.progressBar || 1,
          habit.habitIsChecked ? 1 : 0,
          habit.habitChecks || 0,
        ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            resolve(insertId);
          } else {
            reject(new Error('Failed to insert habit'));
          }
        },
        (_, error) => {
          console.error('Error creating habit:', error);
          reject(error);
        }
      );
    });
  });
};

const findByArea = (habitArea) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${TABLES.HABITS} WHERE habitArea = ?;`,
        [habitArea],
        (_, { rows }) => {
          resolve(rows._array || []);
        },
        (_, error) => {
          console.error('Error finding habit by area:', error);
          reject(error);
        }
      );
    });
  });
};

const updateHabit = (habit) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${TABLES.HABITS} SET
          habitName = ?,
          habitFrequency = ?,
          habitHasNotification = ?,
          habitNotificationFrequency = ?,
          habitNotificationTime = ?
        WHERE habitArea = ?;`,
        [
          habit.habitName,
          habit.habitFrequency,
          habit.habitHasNotification ? 1 : 0,
          habit.habitNotificationFrequency,
          habit.habitNotificationTime,
          habit.habitArea,
        ],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(rowsAffected);
          } else {
            reject(new Error('No habit found to update'));
          }
        },
        (_, error) => {
          console.error('Error updating habit:', error);
          reject(error);
        }
      );
    });
  });
};

const deleteByArea = (habitArea) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${TABLES.HABITS} WHERE habitArea = ?;`,
        [habitArea],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => {
          console.error('Error deleting habit:', error);
          reject(error);
        }
      );
    });
  });
};

const changeProgress = ({ progressBar, habitArea }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${TABLES.HABITS} SET progressBar = ? WHERE habitArea = ?;`,
        [progressBar, habitArea],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            resolve(rowsAffected);
          } else {
            reject(new Error('No habit found to update progress'));
          }
        },
        (_, error) => {
          console.error('Error changing progress:', error);
          reject(error);
        }
      );
    });
  });
};

const dropTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${TABLES.HABITS};`,
        [],
        () => resolve(true),
        (_, error) => {
          console.error('Error dropping habits table:', error);
          reject(error);
        }
      );
    });
  });
};

initializeTable().catch((err) => console.error('Failed to initialize habits table:', err));

export default {
  createHabit,
  findByArea,
  updateHabit,
  deleteByArea,
  deleteByName: deleteByArea,
  changeProgress,
  dropTable,
  initializeTable,
};
