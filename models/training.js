import { pool, sql } from './db.js';

const tableName = 'Training';

export async function sync() {
  try {
    await pool.request().query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id INTEGER IDENTITY(500,1) PRIMARY KEY,
        name VARCHAR(255) UNIQUE
      )
    `);
  } catch (error) {
    console.error('Database connection failed: ', error);
    throw error;
  }
}

export async function getAllTraining() {
    try {
      const poolRequest = pool.request();
      const result = await poolRequest.query(`SELECT * FROM ${tableName}`);
      return result.recordset;
    } catch (err) {
      console.error('Error querying all trainings: ', err);
      throw err; // Rethrow the error to propagate it
    }
  }


  export async function getAllExternalTraining() {
    try {
      const poolRequest = pool.request();
      const result = await poolRequest.query(`SELECT * FROM ${tableName} WHERE type = 'external'`);
      return result.recordset;
    } catch (err) {
      console.error('Error querying external trainings: ', err);
      throw err;
    }
  }
  
  export async function getAllInternalTraining() {
    try {
      const poolRequest = pool.request();
      const result = await poolRequest.query(`SELECT * FROM ${tableName} WHERE type = 'internal'`);
      return result.recordset;
    } catch (err) {
      console.error('Error querying internal trainings: ', err);
      throw err;
    }
  }