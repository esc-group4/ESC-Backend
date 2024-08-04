import { pool } from '../db';
import {  Staff, getByFirebaseUid, staffsync } from '../models/staff';


async function setup() {
  await staffsync();
  await pool.query(`
    DELETE FROM Staff;
  `);
  await pool.query(`
INSERT INTO Staff (staffId, name, email, departmentId, designationId, firebase_uid) VALUES 
(1, 'Javier Tan', 'javiertan@TSH.com', 202, 609, 'o6rYQBa57eg3tKhOl6JXuka5z2Q2'),
(2, 'Vivian Quek', 'QuekVivian@TSH.com', 208, 604, 'ezR4WIByt2QVB60HStWNM1qAamf2');
  `);
}

async function teardown() {
  await pool.query('DELETE FROM Staff');
  await pool.end();
}


describe("models.staff.getByFirebaseUid() tests", () => {
    beforeAll(async () => {
        await setup();
    });

    test("should return a staff member for a valid firebaseUid", async () => {
        const firebaseUid = 'o6rYQBa57eg3tKhOl6JXuka5z2Q2';
        const expected = new Staff(
            "1",
            'Javier Tan',
            "javiertan@TSH.com",
            202,
            609,
            'o6rYQBa57eg3tKhOl6JXuka5z2Q2'
        );

        const result = await getByFirebaseUid(firebaseUid);
        expect(result).toEqual(expected);
    });

    test("should return null for an invalid firebaseUid", async () => {
        const firebaseUid = 'ilovechicken';
        const result = await getByFirebaseUid(firebaseUid);
        expect(result).toBeNull();
    });

    test("should return null if empty firebaseUid", async () => {
        const firebaseUid = '';
        const result = await getByFirebaseUid(firebaseUid);
        expect(result).toBeNull();
    });

    afterAll(async () => {
        await teardown();
    });
});
