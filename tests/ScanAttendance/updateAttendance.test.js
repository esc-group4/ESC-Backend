import { updateAttendance } from '../../models/training.js';
import { pool } from "../../models/db.js";
import iconv from 'iconv-lite';

iconv.encodingExists('foo'); 

jest.mock('../../models/db.js', () => {
  const originalModule = jest.requireActual('../../models/db.js');
  return {
    ...originalModule,
    pool: {
      query: jest.fn(),
      end: jest.fn(() => Promise.resolve()),
    },
  };
});

describe('updateAttendance', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the number of affected rows on successful update', async () => {
    pool.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

    const requestId = 1;
    const staffId = 2;
    const result = await updateAttendance(requestId, staffId);
    expect(pool.query).toHaveBeenCalledWith(
      `UPDATE Training SET attendance = 1 WHERE request_id = ? AND staff_id = ?`,
      [requestId, staffId]
    );
    expect(result).toBe(1);
  });

  it('should throw a Database Error if the query fails', async () => {
    const error = new Error('Database Error: Does not Exist');
    pool.query.mockRejectedValueOnce(error);

    const requestId = 123123124132342; // non-existent request id
    const staffId = 2;

    await expect(updateAttendance(requestId, staffId)).rejects.toThrow('Database Error: Does not Exist');
    expect(pool.query).toHaveBeenCalledWith(
      `UPDATE Training SET attendance = 1 WHERE request_id = ? AND staff_id = ?`,
      [requestId, staffId]
    );
  });
});
