import db from '../storage/database';
import { TABLES } from '../constants';

const initializeTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLES.CHANGE_NAVIGATION} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          showHome TEXT NOT NULL,
          appStartData TEXT NOT NULL
        );`,
        [],
        () => resolve(true),
        (_, error) => {
          console.error('Error creating navigation table:', error);
          reject(error);
        }
      );
    });
  });
};

const setShowHome = ({ showHome, appStartData }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO ${TABLES.CHANGE_NAVIGATION} (showHome, appStartData) VALUES (?, ?);`,
        [showHome, appStartData],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            resolve(insertId);
          } else {
            reject(new Error('Failed to set showHome state'));
          }
        },
        (_, error) => {
          console.error('Error setting showHome:', error);
          reject(error);
        }
      );
    });
  });
};

const checkShowHome = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${TABLES.CHANGE_NAVIGATION} WHERE id = ?;`,
        [id],
        (_, { rows }) => {
          if (rows.length > 0) {
            resolve(rows._array[0]);
          } else {
            reject(new Error(`Navigation record not found: id=${id}`));
          }
        },
        (_, error) => {
          console.error('Error checking showHome:', error);
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
        `DROP TABLE IF EXISTS ${TABLES.CHANGE_NAVIGATION};`,
        [],
        () => resolve(true),
        (_, error) => {
          console.error('Error dropping navigation table:', error);
          reject(error);
        }
      );
    });
  });
};

initializeTable().catch((err) => 
  console.error('Failed to initialize navigation table:', err)
);

export default {
  setShowHome,
  checkShowHome,
  dropTable,
  initializeTable,
};
