import { pool, Table } from "./db.js";

const tableName = "Staff";
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
        [
            "staff_id",
            "staff_name",
            "staff_email",
            "staff_password",
            "staff_hpNum",
            "designation_id",
            "firebase_uid",
        ].forEach((name) => (this[name] = obj[name]));
    }
}

async function all() {
    try {
        const [rows, fieldDefs] = await pool.query(`SELECT * FROM ${tableName}`);
        return rows.map((row) => new Staff(row));
    } catch (error) {
        console.error(`Failed to get all ${tableName}s`, error);
        throw error;
    }
}

async function findById(id) {
    try {
        const [rows, fieldDefs] = await pool.query(
            `SELECT * FROM ${tableName} WHERE staff_id = ?`,
            [id]
        );
        return rows.map((row) => new Staff(row));
    } catch (error) {
        console.error(`Failed to get by ${tableName} id`, error);
        throw error;
    }
}

class StaffDepartmentRole {
    constructor({ staff_id, staff_name, position, description }) {
        this.staff_id = staff_id;
        this.staff_name = staff_name;
        this.position = position;
        this.description = description;
    }
}

async function getAllByDepartmentName(department_name) {
    try {
        const [rows] = await pool.query(`
            SELECT staff_id, staff_name, position, description FROM Staff
            INNER JOIN Designation
            ON Designation.designation_id = Staff.designation_id
            WHERE department_name = ?`, [department_name]
        );
        return rows.map(row => new StaffDepartmentRole(row));
    } catch (error) {
        console.error(`Failed to get by ${tableName}` + error);
        throw error;
    }
}

class StaffDetail {
    constructor({ staff_id, staff_name, staff_email, role }) {
        this.staff_id = staff_id;
        this.staff_name = staff_name;
        this.staff_email = staff_email;
        this.role = role;
    }
}

/**
 * Get staff by firebase_uid
 * @param {string} firebaseUid - The Firebase UID of the staff
 * @returns {StaffDetail} - The staff object
 */
async function getByFirebaseUid(firebaseUid) {
    try {
        const [rows, fieldDefs] = await pool.query(
            `SELECT staff_id, staff_name, staff_email, position as role FROM ${tableName}
        LEFT JOIN Designation
        ON Staff.designation_id = Designation.designation_id
        WHERE firebase_uid = ? 
        LIMIT 1`,
            [firebaseUid]
        );
        if (rows.length === 0) return null;
        return new StaffDetail(rows[0]);
    } catch (error) {
        console.error(`Error fetching staff by firebase_uid:`, error);
        throw error;
    }
}

/**
 * Find staff by email and password
 * @param {string} staff_email - The staff email
 * @param {string} staff_password - The staff password
 * @returns {StaffDetail} - The staff object
 */
async function findByCredentials(email, password) {
    try {
        const [rows] = await pool.query(`
            SELECT staff_id, staff_name, staff_email, position as role FROM ${tableName}
            LEFT JOIN Designation
            ON Staff.designation_id = Designation.designation_id
            WHERE staff_email = ? AND staff_password = ?
            LIMIT 1`,
            [email, password]
        );
        if (rows.length === 0) return null;
        return new StaffDetail(rows[0]);
    } catch (error) {
        console.error(`Error fetching staff by credentials:`, error);
        throw error;
    }
}

export { Staff, getByFirebaseUid, table, all, findById, findByCredentials, getAllByDepartmentName };