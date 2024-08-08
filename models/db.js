import mysql from 'mysql2';

const database = "tsh";
const pool = mysql
    .createPool({
        host: "localhost",
        user: "root",
        database: "tsh",
        password: "password",
        connectionLimit: 10,
    })
    .promise();

async function init() {
    try {
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${database}`);
        await pool.query(`Use ${database}`);
    } catch (error) {
        console.error('Database Failed to Create and Use: ', error);
        throw error;
    }
}

(async () => {
  await init();
})();
const cleanup = async () => await pool.end();

class Table {
    constructor(tableName, tableColumns) {
        this.tableName = tableName;
        this.tableColumns = tableColumns;
    }

    async sync() {
        const { tableName, tableColumns } = this;
        try {
            await pool.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableColumns});`);
        } catch (error) {
            console.error(`${tableName} failed to sync: `, error);
            throw error;
        }
    }
}

async function getLastInsertID() {
    const [rows] = await pool.query("SELECT LAST_INSERT_ID()");
    return rows[0]['LAST_INSERT_ID()'];
}

export { pool, cleanup, Table, getLastInsertID };