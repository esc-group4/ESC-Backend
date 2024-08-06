import { pool } from './db.js';

class Notification {
    constructor({ staff_name, staff_email, startDate, location, course_name, hp_num }) {
        this.staff_name = staff_name;
        this.staff_email = staff_email;
        this.startDate = startDate;
        this.location = location;
        this.course_name = course_name;
        this.hp_num = hp_num;
    }
}

async function getNotification() {
    try {
        const [rows] = await pool.query(`
            SELECT staff_name, staff_email, staff_hpnum as hp_num, startDate, course_location as location, TrainingRequest.course_name from Training
            INNER JOIN TrainingRequest
            ON TrainingRequest.request_id = Training.request_id
            INNER JOIN Staff
            on Staff.staff_id = Training.staff_id
            INNER JOIN Course
            ON Course.course_name = TrainingRequest.course_name
            WHERE startDate = curdate() + INTERVAL 7 DAY;
        `);
        return rows.map(row => new Notification(row));
    } catch (error) {
        console.error(`Failed to get by ${tableName} id` + error);
        throw error;
    }
}

export { getNotification };