import { sync as departmentSync } from '../models/department.js';
import { sync as designationSync } from '../models/designation.js';
import { sync as staffSync } from '../models/staff.js';

// Requied sync to be in order as certain table is reqqired first before another
export const sync = async () => {
    await departmentSync();
    await designationSync();
    await staffSync();
}
