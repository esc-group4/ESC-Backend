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
    console.error("database connection failed. " + error);
    throw error;
  }
}

export { sync, all };

// /**
//  * Return a list containing one staff member if exists by its staff id
//  * @param {int} id - The staff id
//  * @returns {Promise<Object[]>} - A list of staff members (either empty or containing one staff member)
//  */
// async function getStaff(id) {
//   try {
//     const request = pool.request();
//     request.input('id', sql.Int, id);
//     const result = await request.query(`SELECT * FROM ${tableName} WHERE id = @id`);
//     return result.recordset;
//   } catch (error) {
//     console.error('Error querying staff by id: ', error);
//     throw error;
//   }
// }

// async function insertStaff(staff) {
//   const { first_name, last_name, email, designation_id, training_id } = staff;

//   try {
//     const request = pool.request();
//     request.input('first_name', sql.VarChar(255), first_name);
//     request.input('last_name', sql.VarChar(255), last_name);
//     request.input('email', sql.VarChar(255), email);
//     request.input('designation_id', sql.Int, designation_id);
//     request.input('training_id', sql.Int, training_id);

//     const result = await request.query(`
//         INSERT INTO ${tableName} (first_name, last_name, email, designation_id, training_id)
//         VALUES (@first_name, @last_name, @email, @designation_id, @training_id);
//         SELECT SCOPE_IDENTITY() AS insertedId;
//       `);

//     const insertedId = result.recordset[0].insertedId;
//     return getStaff(insertedId);
//   } catch (error) {
//     console.error('Error inserting staff: ', error);
//     throw error;
//   }
// }

// export { sync, getStaff, insertStaff };