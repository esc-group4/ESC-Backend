import { pool } from './db.js';

const tableName = 'Department';

async function sync() {
  try {
    pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        department_name VARCHAR(100) NOT NULL,
        department_location VARCHAR(100) NOT NULL,
        PRIMARY KEY (department_name),
          UNIQUE (department_name)
      )`);
  } catch (error) {
    console.error('Database connection failed: ', error);
    throw error;
  }
}

export default { sync };