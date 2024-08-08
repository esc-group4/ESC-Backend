import { pool, Table, getLastInsertID } from "./db.js";

const tableName = "TrainingRequest";
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
  constructor({
    request_id,
    course_name,
    status,
    type,
    date,
    personnel,
    reasons,
    department_name = undefined,
  }) {
    this.status = "Pending";
    if (status == 1)
      this.status = new Date(new Date()) > this.date ? "Completed" : "Approved";
    this.request_id = request_id;
    this.course_name = course_name;
    this.type = type;
    this.date = date;
    this.personnel = personnel;
    this.department_name = department_name;
    this.reasons = reasons;
  }
}

async function getTrainingRequestAll() {
  // this is used for the HR page
  try {
    const [rows] = await pool.query(
      `SELECT request_id, course_name,department_name, type, status, endDate as date,  
            (SELECT count(*) FROM tsh.Training where tsh.Training.request_id = tsh.TrainingRequest.request_id group by tsh.Training.request_id) as personnel 
            FROM tsh.TrainingRequest; `
    );
    return rows.map((row) => new TrainingRequest(row));
  } catch (error) {
    console.error(`Failed to get ${tableName}` + error);
    throw error;
  }
}

async function getTrainingRequestDetails(request_id) {
  try {
    const [rows] = await pool.query(
      `SELECT request_id, course_name, type, status, reasons, endDate as date, reasons
            FROM tsh.${tableName}
            WHERE request_id = ?`,
      [request_id]
    );
    if (rows.length == 0) return null;
    return new TrainingRequest(rows[0]);
  } catch (error) {
    console.error(`Failed to get ${tableName}` + error);
    throw error;
  }
}

async function getTrainingRequest(department_name) {
  try {
    const [rows] = await pool.query(
      `SELECT request_id, course_name, type, status, endDate as date, 
            (SELECT count(*) FROM tsh.Training where tsh.Training.request_id = tsh.TrainingRequest.request_id group by tsh.Training.request_id) as personnel 
            FROM tsh.TrainingRequest 
            WHERE department_name = ?;`,
      [department_name]
    );
    return rows.map((row) => new TrainingRequest(row));
  } catch (error) {
    console.error(`Failed to get ${tableName}` + error);
    throw error;
  }
}

async function create(
  type,
  reasons,
  startDate,
  endDate,
  trainerEmail,
  department_name,
  course_name
) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO tsh.TrainingRequest (type, reasons, startDate, endDate, trainerEmail, department_name, course_name)
            VALUES (?,?,?,?,?,?,?)`,
      [
        type,
        reasons,
        startDate,
        endDate,
        trainerEmail,
        department_name,
        course_name,
      ]
    );
    if (rows.affectedRows == 0)
      throw new Error("Fail to create Training Request, affectedrow = 0");
    const request_id = await getLastInsertID();
    return request_id;
  } catch (error) {
    console.error(`Failed to get ${tableName}` + error);
    throw error;
  }
}

async function updateStatus(request_id) {
  try {
    const [rows] = await pool.query(
      `UPDATE ${tableName} SET status = 1 WHERE request_id = ?`,
      [request_id]
    );
    return rows.affectedRows;
  } catch (error) {
    console.error(
      `Failed to get ${tableName} by request_id and staff_id:` + error
    );
    throw error;
  }
}

class TrainerInfo {
  constructor({ request_id, trainerEmail }) {
    this.trainerEmail = trainerEmail;
    this.request_id = request_id;
  }
}

async function getProcessedTrainerInfo() {
  try {
    const [rows] = await pool.query(
      `SELECT request_id, trainerEmail FROM ${tableName} WHERE startDate = CURDATE() + INTERVAL 1 DAY;`
    );
    return rows.map((row) => new TrainerInfo(row));
  } catch (error) {
    console.error(`Failed to get processed ${tableName} for trainer:` + error);
    throw error;
  }
}

export {
  table,
  getTrainingRequest,
  create,
  updateStatus,
  getProcessedTrainerInfo,
  getTrainingRequestAll,
  getTrainingRequestDetails,
};
