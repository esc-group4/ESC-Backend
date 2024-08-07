import { byStaffId } from '../../models/course.js';
import { TrainingCourse } from '../../models/course.js';
import { pool } from '../../models/db.js';

// we will be mocking with staffid 6 (3 values, 1,1,0)


jest.mock('../controllers/db', () => ({
    pool: {
      query: jest.fn(),
    },
  }));
  
  describe('byStaffId', () => {
    afterEach(() => {
      jest.clearAllMocks(); 
    });



    it('Pull correct data out and determine its correct status (Complete,Upcoming,Expired)', async () => {
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
        }
      ];
        pool.query.mockResolvedValueOnce([mockRows]);
  
      const staffId = 6;
      const result = await byStaffId(staffId);
  
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [staffId]);
      expect(result).toHaveLength(mockRows.length);
  
      // Check the status of each TrainingCourse
      expect(result[0].status).toBe('Completed');
      expect(result[1].status).toBe('Completed');
      expect(result[2].status).toBe('Upcoming');
    });
  
    it('should throw an error if the database query fails', async () => {
      const error = new Error('Database error');
      pool.query.mockRejectedValueOnce(error);
  
      const staffId = 1231231;
  
      await expect(byStaffId(staffId)).rejects.toThrow('Database error');
  
      expect(pool.query).toHaveBeenCalledWith(expect.any(String), [staffId]);
    });
  });
