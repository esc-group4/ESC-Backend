import { pool } from './db.js';

const tableName = 'Staff';
const tableColumns = `
staff_id INT NOT NULL AUTO_INCREMENT,
staff_name VARCHAR(100) NOT NULL,
staff_email VARCHAR(100) NOT NULL,
staff_password VARCHAR(100) NOT NULL,
staff_hpNum INT,
designation_id INT NOT NULL,
UNIQUE (staff_name),
PRIMARY KEY (staff_id),
FOREIGN KEY (designation_id) REFERENCES Designation(designation_id)
`;

class Staff {
  constructor(obj) {
    const columns = [
      "staff_id",
      "staff_name",
      "staff_email",
      "staff_password",
      "staff_hpNum",
      "designation_id"
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
    return rows.map(row => new Staff(row));
  } catch (error) {
    console.error(`Failed to get all ${tableName}s` + error);
    throw error;
  }
}

async function findById(id) {
  try {
    const [rows, fieldDefs] = await pool.query(`
          SELECT * FROM ${tableName} WHERE staff_id = ?`, [id]
    );
    return rows.map(row => new Staff(row));
  } catch (error) {
    console.error(`Failed to get by ${tableName} id` + error);
    throw error;
  }
}

export { sync, all, findById };