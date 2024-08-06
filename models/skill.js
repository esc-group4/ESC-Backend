import { pool, Table } from './db.js';

const tableName = 'Skill';
const tableColumns = `
skill_name VARCHAR(100) NOT NULL,
PRIMARY KEY (skill_name),
UNIQUE (skill_name)
`

const table = new Table(tableName, tableColumns);

class Skill {
    constructor(obj) {
        const columns = [
            "skill_name"
        ].forEach(name => this[name] = obj[name]);
    }
}

export { table };