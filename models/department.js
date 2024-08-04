import { pool } from './db.js';

const tableName = 'Department';
const tableColumns = `
department_name VARCHAR(100) NOT NULL,
department_location VARCHAR(100) NOT NULL,
PRIMARY KEY (department_name),
UNIQUE (department_name)
`;

class Department {
  constructor(obj) {
    const columns = [
      "department_name",
      "department_location"
    ].forEach(name => this[name] = obj[name]);
  }
}

async function sync() {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns});`);
  } catch (error) {
    console.error(`${tableName} failed to sync: `, error);
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