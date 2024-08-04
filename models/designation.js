import { pool } from './db.js';

const tableName = 'Designation';
const tableColumns = `
designation_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NOT NULL,
position VARCHAR(100) NOT NULL,
description VARCHAR(100) NOT NULL,
PRIMARY  KEY (designation_id),
FOREIGN KEY (department_name) REFERENCES Department(department_name),
UNIQUE (position)
`;

class Designation {
    constructor(obj) {
        const columns = [
            "designation_id",
            "department_name",
            "position",
            "description"
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

export { sync };