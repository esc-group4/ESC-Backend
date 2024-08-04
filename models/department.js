import { pool } from './db.js';

const tableName = 'Department';

class Department {
  constructor({ department_name, department_location = null }) {
    this.department_name = department_name;
    this.department_location = department_location;
  }
}

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

async function all() {
  try {
    const [rows, fieldDefs] = await pool.query(`SELECT * FROM ${tableName}`);
    return rows.map(row => new Department(row));
  } catch (error) {
    console.error("database connection failed. " + error);
    throw error;
  }
}

export { sync, all };