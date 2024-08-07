import { pool, Table } from "./db.js";

const tableName = "Training";
const tableColumns = `
grade VARCHAR(2),
attendance BOOL DEFAULT 0 NOT NULL,
request_id INT NOT NULL,
FOREIGN KEY (request_id) REFERENCES TrainingRequest(request_id),
staff_id int NOT NULL,
FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
`;

const table = new Table(tableName, tableColumns);

async function updateAttendance(request_id, staff_id) {
    try {
        const [rows, fieldDefs] = await pool.query(
            `UPDATE ${tableName} SET attendance = 1 WHERE request_id = ? AND staff_id = ?`,
            [request_id, staff_id]
        );
        return rows.affectedRows;
    } catch (error) {
        console.error(`Failed to get ${tableName} by request_id and staff_id:` + error);
        throw error;
    }
}

async function getStaffsByRequestId(request_id) {
    try {
        const [rows] = await pool.query(`
            SELECT Training.staff_id, staff_name FROM ${tableName}
            LEFT JOIN Staff
            ON Staff.staff_id = Training.staff_id
            WHERE request_id = ?`,
            [request_id]
        );
        console.log(rows);

        return rows.map(({ staff_id, staff_name }) => {
            return { staff_id, staff_name };
        });
    } catch (error) {
        console.error(`Failed to get ${tableName}` + error);
        throw error;
    }
}


// https://stackoverflow.com/questions/74846069/how-to-bulk-insert-into-sql-using-myql2
async function createMany(request_id, staff_ids) {
    try {
        const query = pool.format(
            "INSERT INTO Training (request_id, staff_id)  VALUES ?",
            [staff_ids.map(staff_id => [request_id, staff_id])]
        );
        const [rows] = await pool.query(query);
        return rows.affectedRows;
    } catch (error) {
        console.error(`Failed to create training(s) ${tableName}:` + error);
        throw error;
    }
}

export { table, updateAttendance, createMany, getStaffsByRequestId };