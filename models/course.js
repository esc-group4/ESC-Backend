import { pool, Table } from "./db.js";

const tableName = "Course";
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
      "course_location",
    ].forEach((name) => (this[name] = obj[name]));
  }
}

async function all() {
  try {
    const [rows, fieldDefs] = await pool.query(`SELECT * FROM ${tableName}`);
    return rows.map((row) => new Course(row));
  } catch (error) {
    console.error(`Failed to get all ${tableName}s` + error);
    throw error;
  }
}

class TrainingCourse {
  constructor(obj) {
    const columns = [
      "grade",
      "attendance",
      "type",
      "reasons",
      "completedDateTime",
      "startDate",
      "endDate",
      "course_name",
      "providerName",
      "skill_name",
      "course_location",
      "course_description",
    ].forEach((name) => (this[name] = obj[name]));
    this.status = this.computeStatus();
  }

  computeStatus() {
    const current_date = new Date(new Date().toDateString());
    if (this.attendance == 1) return "Completed";
    if (current_date <= this.endDate) return "Upcoming";
    if (current_date > this.endDate && this.attendance == 0) return "Expired";
    return "Invalid Status";
  }
}

async function byStaffId(id) {
  try {
    const [rows, fieldDefs] = await pool.query(
      `
            SELECT grade, attendance, type, reasons, completedDateTime, startDate, endDate, TrainingRequest.course_name, providerName, skill_name, course_location, course_description FROM Training
            LEFT JOIN TrainingRequest
            ON TrainingRequest.request_id = Training.request_id
            LEFT JOIN Course
            ON TrainingRequest.course_name = Course.course_name
            WHERE staff_id = ?
        `,
      [id]
    );
    return rows.map((row) => {
      const tc = new TrainingCourse(row);
      console.log(tc.status);
      return tc;
    });
  } catch (error) {
    console.error(`Failed to get all ${tableName}s` + error);
    throw error;
  }
}

export { table, all, byStaffId };
