import { pool, Table, getLastInsertID } from './db.js';

const tableName = 'TrainingRequest';
const tableColumns = `
request_id INT NOT NULL AUTO_INCREMENT,
type VARCHAR(100) NOT NULL,
generatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
reasons VARCHAR(100),
completedDateTime DATETIME,
status BOOL DEFAULT 0 NOT NULL,
startDate DATE,
endDate DATE,
trainerEmail VARCHAR(100),
PRIMARY KEY (request_id),
department_name VARCHAR(100) NOT NULL,
FOREIGN KEY (department_name) REFERENCES Department(department_name),
course_name VARCHAR(100) NOT NULL,
FOREIGN KEY (course_name) REFERENCES Course(course_name),
UNIQUE (request_id)
`;

const table = new Table(tableName, tableColumns);

class TrainingRequest {
    constructor({ request_id, course_name, status, type, date, personnel }) {
        this.status = "Pending";
        if (status == 1) this.status = new Date(new Date()) > this.date ? "Completed" : "Approved";
        this.request_id = request_id;
        this.course_name = course_name;
        this.type = type;
        this.date = date;
        this.personnel = personnel;
    }
}

async function getTrainingRequest(department_name) {
    try {
        const [rows] = await pool.query(
            `SELECT request_id, course_name, type, status, endDate as date, 
            (SELECT count(*) FROM Training where Training.request_id = TrainingRequest.request_id group by Training.request_id) as personnel 
            FROM TrainingRequest 
            WHERE department_name = ?;`,
            [department_name]
        );
        return rows.map(row => new TrainingRequest(row));
    } catch (error) {
        console.error(`Failed to get ${tableName}` + error);
        throw error;
    }
}

async function create(type, reasons, startDate, endDate, trainerEmail, department_name, course_name) {
    try {
        const [rows] = await pool.query(
            `INSERT INTO tsh.TrainingRequest (type, reasons, startDate, endDate, trainerEmail, department_name, course_name)
            VALUES (?,?,?,?,?,?,?)`, [type, reasons, startDate, endDate, trainerEmail, department_name, course_name]
        );
        if (rows.affectedRows == 0) throw new Error("Fail to create Training Request, affectedrow = 0");
        const request_id = await getLastInsertID();
        return request_id;
    } catch (error) {
        console.error(`Failed to get ${tableName}` + error);
        throw error;
    }
}


export { table, getTrainingRequest, create };