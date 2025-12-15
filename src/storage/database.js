import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('dotlife.db');

export default db;