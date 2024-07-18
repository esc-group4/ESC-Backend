import { pool, sql } from './db.js';

const tableName = 'Staff';

export async function sync() {
  try {
    await pool.request().query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER IDENTITY(100,1) PRIMARY KEY,
        name VARCHAR(255) UNIQUE
      )
    `);
  } catch (error) {
    console.error('Database connection failed: ', error);
    throw error;
  }
}


export async function getAllStaff() {
  try {
    const poolRequest = pool.request();
    const result = await poolRequest.query(`SELECT * FROM ${tableName}`);
    return result.recordset;
  } catch (err) {
    console.error('Error querying all staff: ', err);
    throw err; // Rethrow the error to propagate it
  }
}
/**
 * Return a list containing one staff member if exists by its staff id
 * @param {int} id - The staff id
 * @returns {Promise<Object[]>} - A list of staff members (either empty or containing one staff member)
 */
export async function getStaff(id) {
  try {
    const request = pool.request();
    request.input('id', sql.Int, id);
    const result = await request.query(`SELECT * FROM ${tableName} WHERE id = @id`);
    return result.recordset;
  } catch (error) {
    console.error('Error querying staff by id: ', error);
    throw error;
  }
}

export async function insertStaff(staff) {
    const { first_name, last_name, email, designation_id, training_id } = staff;
  
    try {
      const request = pool.request();
      request.input('first_name', sql.VarChar(255), first_name);
      request.input('last_name', sql.VarChar(255), last_name);
      request.input('email', sql.VarChar(255), email);
      request.input('designation_id', sql.Int, designation_id);
      request.input('training_id', sql.Int, training_id);
  
      const result = await request.query(`
        INSERT INTO ${tableName} (first_name, last_name, email, designation_id, training_id)
        VALUES (@first_name, @last_name, @email, @designation_id, @training_id);
        SELECT SCOPE_IDENTITY() AS insertedId;
      `);
  
      const insertedId = result.recordset[0].insertedId;
      return getStaff(insertedId);
    } catch (error) {
      console.error('Error inserting staff: ', error);
      throw error;
    }
  }