import { pool, Table } from "./db.js";

const tableName = "Designation";
const tableColumns = `
designation_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NOT NULL,
position VARCHAR(100) NOT NULL,
description VARCHAR(100) NOT NULL,
PRIMARY  KEY (designation_id),
FOREIGN KEY (department_name) REFERENCES Department(department_name),
UNIQUE (position)
`;

const table = new Table(tableName, tableColumns);

class Designation {
  constructor(obj) {
    const columns = [
      "designation_id",
      "department_name",
      "position",
      "description",
    ].forEach((name) => (this[name] = obj[name]));
  }
}

/**
 * Get the designation name by ID
 * @param {number} designationId - The ID of the designation
 * @returns {string} - The name of the designation
 */
async function getNameById(designationId) {
  try {
    const [rows, fieldDefs] = await pool.query(
      `
      SELECT position FROM ${tableName} WHERE designationId = ?
    `,
      [designationId]
    );
    if (rows.length === 0) return null;

    const row = rows[0];
    return row.position;
  } catch (error) {
    console.error(`Error fetching designation by ID:`, error);
    throw error;
  }
}

export { Designation, getNameById, table };
