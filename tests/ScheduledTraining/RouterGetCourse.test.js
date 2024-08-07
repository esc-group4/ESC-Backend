import request from 'supertest';
import express from 'express';
import { router } from '../../routes/course'; 
import { byStaffId } from '../../models/course.js';

jest.mock('./path/to/your/module', () => ({
  byStaffId: jest.fn(),
}));

describe('Get Courses by StaffID GET /staff/:id', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/staff', router); // Mount the router under the /staff path
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to prevent interference
  });

  it('should return a list of training courses for a valid staff id', async () => {
    const mockRows = [
        {
          grade: 'A',
          attendance: 1,
          type: 'External',
          reasons: null,
          completedDateTime: null,
          startDate: '2024-08-14', //past
          endDate: '2024-08-15',
          course_name: 'AED 2024',
          providerName: 'SUTD',
          skill_name: 'AED',
          course_location: '3 Fusionopolis Link, Singapore 138542',
          course_description: 'Life saving course',
          status: 'Completed'
        },
        {
          grade: 'B',
          attendance: 1,
          type: 'External',
          reasons: null,
          completedDateTime: null,
          startDate: '2024-08-28', //future but attended
          endDate: '2024-08-30',
          course_name: 'Digital Marketing Strategy',
          providerName: 'Google',
          skill_name: 'Digital Marketing',
          course_location: '70 Pasir Panjang Road, Singapore 117371',
          course_description: 'Online marketing techniques',
          status: 'Completed'
        },
        {
          grade: null,
          attendance: 0,
          type: 'External',
          reasons: null,
          completedDateTime: null,
          startDate: '2024-09-11',
          endDate: '2024-09-12', // upcoming
          course_name: 'Advanced Excel',
          providerName: 'Microsoft',
          skill_name: 'Microsoft Office',
          course_location: '182 Cecil Street, Singapore 069547',
          course_description: 'Advanced spreadsheet techniques',
          status: 'Upcoming'
        }
      ];

    byStaffId.mockResolvedValueOnce(mockRows);

    const staffId = 6;
    const response = await request(app).get(`/staff/${staffId}`);

    expect(byStaffId).toHaveBeenCalledWith(staffId.toString());
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRows);
  });

  it('should return 500 if an error occurs while retrieving data', async () => {
    const error = new Error('Database error');
    byStaffId.mockRejectedValueOnce(error);

    const staffId = 232342342;
    const response = await request(app).get(`/staff/${staffId}`);

    expect(byStaffId).toHaveBeenCalledWith(staffId.toString());
    expect(response.status).toBe(500);
    expect(response.text).toBe('Error retrieving course');
  });
});
