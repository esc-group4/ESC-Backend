import request from 'supertest';
import express from 'express';
import { router } from '../../routes/attendance';
import { updateAttendance } from '../models/training';

jest.mock('../models/training');

describe('Attendance Router Integration Tests', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/attendance', router); // typical things before calling route
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update attendance successfully', async () => {
    // test success
    updateAttendance.mockResolvedValueOnce(1);

    const response = await request(app).put('/attendance/1/2');

    expect(updateAttendance).toHaveBeenCalledWith('1', '2');
    expect(response.status).toBe(201);
    expect(response.text).toBe('Attendance Updated');
  });

  it('should return 400 for invalid request_id or staff_id', async () => {
    updateAttendance.mockResolvedValueOnce(0); // Simulate no rows affected

    const response = await request(app).put('/attendance/1/2');

    expect(updateAttendance).toHaveBeenCalledWith('1', '2');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request_id or staff_id');
  });

  it('should return 404 for missing request_id or staff_id', async () => {
    const response = await request(app).put('/attendance//');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Empty request_id or staff_id');
  });

  it('should return 400 for invalid or non-existent request_id or staff_id', async () => {
    updateAttendance.mockResolvedValueOnce(0); // 0 rows affected
    const response = await request(app).put('/attendance/naosdnoa/aslkdlads');

    expect(updateAttendance).toHaveBeenCalledWith('naosdnoa', 'aslkdlads');
    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid request_id or staff_id');

    const responseMissing = await request(app).put('/attendance//');
    expect(responseMissing.status).toBe(404);
    expect(responseMissing.text).toBe('Empty request_id or staff_id');
  });

  it('should return 500 on server error', async () => {
    updateAttendance.mockRejectedValueOnce(new Error('Database error')); // Simulate a server error

    const response = await request(app).put('/attendance/1/2');

    expect(updateAttendance).toHaveBeenCalledWith('1', '2');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Error retrieving department');
  });
});
