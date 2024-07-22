import { pool } from './db.js';

const tableName = 'Designation';

class Designation {
  constructor(designationId, position) {
    this.designationId = designationId;
    this.position = position;
  }}

   async function sync() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
          designationId INT AUTO_INCREMENT PRIMARY KEY,
          position VARCHAR(255) NOT NULL
        )
      `);
      console.log(`Table ${tableName} created or already exists`);
    } catch (error) {
      console.error(`Error creating table ${tableName}:`, error);
      throw error;
    }
  }

  /**
   * Get the designation name by ID
   * @param {number} designationId - The ID of the designation
   * @returns {string} - The name of the designation
   */
   async function getNameById(designationId) {
    try {
      const [rows, fieldDefs] = await pool.query(`
        SELECT position FROM ${tableName} WHERE designationId = ?
      `, [designationId]);
      if (rows.length === 0) return null;

      const row = rows[0];
      return row.position;
    } catch (error) {
      console.error(`Error fetching designation by ID:`, error);
      throw error;
    }
  }

export { Designation, getNameById, sync }