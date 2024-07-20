import { pool, sql } from './db.js';

const tableName = 'Staff';

// Check if a column exists in the table
async function columnExists(columnName) {
  try {
    const result = await pool.request().query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = '${tableName}' AND COLUMN_NAME = '${columnName}'
    `);
    return result.recordset.length > 0;
  } catch (error) {
    console.error('Error checking column existence: ', error);
    throw error;
  }
}

// Add a new column to the table
async function addColumn(columnName, columnType) {
  try {
    await pool.request().query(`
      ALTER TABLE ${tableName}
      ADD ${columnName} ${columnType}
    `);
    console.log(`Column ${columnName} added`);
  } catch (error) {
    console.error(`Error adding column ${columnName}: `, error);
    throw error;
  }
}

export async function insertStaff(staff) {
  const columns = {
    first_name: 'VARCHAR(40)',
    last_name: 'VARCHAR(40)',
    email: 'VARCHAR(100)',
    designation_id: 'INT',
    training_id: 'INT'
  };

  try {
    for (const column in staff) {
      if (!await columnExists(column)) {
        await addColumn(column, columns[column] || 'VARCHAR(255)');
      }
    }

    const request = pool.request();
    for (const key in staff) {
      request.input(key, sql.VarChar(255), staff[key]);
    }

    const result = await request.query(`
      INSERT INTO ${tableName} (${Object.keys(staff).join(', ')})
      VALUES (${Object.keys(staff).map((_, i) => `@${Object.keys(staff)[i]}`).join(', ')});
      SELECT SCOPE_IDENTITY() AS insertedId;
    `);

    const insertedId = result.recordset[0].insertedId;
    return getStaff(insertedId);
  } catch (error) {
    console.error('Error inserting staff: ', error);
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
    throw err;
  }
}

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