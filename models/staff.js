import { pool } from './db.js';

const tableName = 'Staff';

class Staff {
  constructor(id, name, email, departmentId, designationId, firebaseUid) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.departmentId = departmentId;
    this.designationId = designationId;
    this.firebaseUid = firebaseUid;
  }}



 async function staffsync() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        departmentId INT,
        designationId INT,
        firebase_uid VARCHAR(255) UNIQUE,
        FOREIGN KEY (departmentId) REFERENCES Department(departmentId),
        FOREIGN KEY (designationId) REFERENCES Designation(designationId)
      )
    `);
    console.log(`Table ${tableName} created or already exists`);
  } catch (error) {
    console.error('Database connection failed: ', error);
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


export { Staff, getByFirebaseUid, staffsync } 
