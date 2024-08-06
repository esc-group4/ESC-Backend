import { pool, Table } from './db.js';

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

export { table };