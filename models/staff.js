import { pool, Table } from './db.js';

const tableName = 'Staff';
const tableColumns = `
staff_id INT NOT NULL AUTO_INCREMENT,
staff_name VARCHAR(100) NOT NULL,
staff_email VARCHAR(100) NOT NULL,
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

class StaffDetail {
    constructor(obj) {
        const columns = [
            "staff_id",
            "staff_name",
            "staff_email",
            "role"
        ].forEach(name => this[name] = obj[name]);
    }
}

/**
 * Get staff by firebase_uid
 * @param {string} firebaseUid - The Firebase UID of the staff
 * @returns {StaffDetail} - The staff object
 */
async function getByFirebaseUid(firebaseUid) {
    try {
        const [rows, fieldDefs] = await pool.query(`
        SELECT staff_id, staff_name, staff_email, position as role FROM ${tableName}
        LEFT JOIN Designation
        ON Staff.designation_id = Designation.designation_id
        WHERE firebase_uid = ? 
        LIMIT 1;
        `, [firebaseUid]);
        if (rows.length === 0) return null;
        return new StaffDetail(rows[0]);
    } catch (error) {
        console.error(`Error fetching staff by firebase_uid:`, error);
        throw error;
    }
}

export { Staff, getByFirebaseUid, table, all, findById } 