import { pool, Table } from './db.js';

const tableName = 'Department';
const tableColumns = `
department_name VARCHAR(100) NOT NULL,
department_location VARCHAR(100) NOT NULL,
PRIMARY KEY (department_name),
UNIQUE (department_name)
`;

const table = new Table(tableName, tableColumns);

class Department {
  constructor(obj) {
    const columns = [
      "department_name",
      "department_location"
    ].forEach(name => this[name] = obj[name]);
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

export { table, all };