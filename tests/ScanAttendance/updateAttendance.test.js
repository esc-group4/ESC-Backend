import { updateAttendance } from '../../models/training.js';
import { pool } from "../../models/db.js";
jest.mock('../controllers/db.js', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('updateAttendance', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the number of affected rows on successful update', async () => {
    //TEST: DOES SUCCESS WORK?
    pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // only one row affected

    const requestId = 1;
    const staffId = 2;
    const result = await updateAttendance(requestId, staffId);
    expect(pool.query).toHaveBeenCalledWith(
      `UPDATE Training SET attendance = 1 WHERE request_id = ? AND staff_id = ?`,
      [requestId, staffId]
    );
    expect(result).toBe(1);
  });

  it('Throw Database Error', async () => {
    //TEST: WILL FAILURE BE CAUGHT?
    const error = new Error('Database Error: Does not Exist');
    pool.query.mockRejectedValueOnce(error);

    const requestId = 123123124132342; // no request id existed
    const staffId = 2;

    await expect(updateAttendance(requestId, staffId)).rejects.toThrow('Database Error: Does not Exist');
    expect(pool.query).toHaveBeenCalledWith(
      `UPDATE Training SET attendance = 1 WHERE request_id = ? AND staff_id = ?`,
      [requestId, staffId]
    );
  });

});
