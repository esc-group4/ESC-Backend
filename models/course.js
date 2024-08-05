import { pool, Table } from './db.js';

const tableName = 'Course';
const tableColumns = `
course_name VARCHAR(100) NOT NULL UNIQUE,
providerName VARCHAR(100) NOT NULL,
skill_name VARCHAR(100) NOT NULL,
course_description VARCHAR(255) NOT NULL,
course_location VARCHAR(255) NOT NULL,
PRIMARY KEY (course_name),
FOREIGN KEY (skill_name) REFERENCES Skill(skill_name)
`;

const table = new Table(tableName, tableColumns);

class Course {
    constructor(obj) {
        const columns = [
            "course_name",
            "providerName",
            "skill_name",
            "course_description",
            "course_location"
        ].forEach(name => this[name] = obj[name]);
    }
}

async function all() {
    try {
        const [rows, fieldDefs] = await pool.query(`SELECT * FROM ${tableName}`);
        return rows.map(row => new Course(row));
    } catch (error) {
        console.error(`Failed to get all ${tableName}s` + error);
        throw error;
    }
}

export { table, all };
