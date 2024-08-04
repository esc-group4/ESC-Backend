import { pool, Table } from './db.js';

const tableName = 'Staff';
const tableColumns = `
staff_id INT NOT NULL AUTO_INCREMENT,
staff_name VARCHAR(100) NOT NULL,
staff_email VARCHAR(100) NOT NULL,
staff_password VARCHAR(100) NOT NULL,
staff_hpNum INT,
designation_id INT NOT NULL,
firebase_uid VARCHAR(255) NOT NULL,
UNIQUE (staff_name),
PRIMARY KEY (staff_id),
FOREIGN KEY (designation_id) REFERENCES Designation(designation_id)
`;

const table = new Table(tableName, tableColumns);

class Staff {
  constructor(obj) {
    const columns = [
      "staff_id",
      "staff_name",
      "staff_email",
      "staff_password",
      "staff_hpNum",
      "designation_id",
      "firebase_uid"
    ].forEach(name => this[name] = obj[name]);
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

/**
 * Get staff by firebase_uid
 * @param {string} firebaseUid - The Firebase UID of the staff
 * @returns {Staff} - The staff object
 */
async function getByFirebaseUid(firebaseUid) {
  try {
    const [rows, fieldDefs] = await pool.query(`
      SELECT staffId, name, email, departmentId, designationId, firebase_uid 
      FROM ${tableName} 
      WHERE firebase_uid = ?
    `, [firebaseUid]);
    if (rows.length === 0) return null;

    const row = rows[0]; // its only 1 row anyways
    return new Staff(row.id, row.name, row.email, row.departmentId, row.designationId, row.firebase_uid);
  } catch (error) {
    console.error(`Error fetching staff by firebase_uid:`, error);
    throw error;
  }
}

export { Staff, getByFirebaseUid, table, all, findById } 