// models/course.js
const courses = [
    {
        id: 1,
        title: 'COURSE TEST 1',
        deadline: '2024-07-27',
        info: 'Details about Course 1',
        location: 'Location A',
        status: 'Upcoming',
        countdown: '07 : 06 : 59',
        description: 'This is a description of Course 1',
        trainer: 'Trainer A'
      },
      {
        id: 2,
        title: 'Course TEST 2',
        deadline: '2024-08-05',
        info: 'Details about Course 2',
        location: 'Location B',
        status: 'Evaluation Required',
        countdown: '00 : 00 : 00',
        description: 'This is a description of Course 2',
        trainer: 'Trainer B'
      },
      {
        id: 3,
        title: 'Course TEST 3',
        deadline: '2024-08-25',
        info: 'Details about Course 3',
        location: 'Location C',
        status: 'Completed',
        countdown: '00 : 00 : 00',
        description: 'This is a description of Course 3',
        trainer: 'Trainer C'
      },
      {
        id: 4,
        title: 'Course 4',
        deadline: '2024-09-02',
        info: 'Details about Course 4',
        location: 'Location D',
        status: 'Expired',
        countdown: '00 : 00 : 00',
        description: 'This is a description of Course 4',
        trainer: 'Trainer D'
      },
      {
        id: 5,
        title: 'Course 5',
        deadline: '2024-10-21',
        info: 'Details about Course 5',
        location: 'Location E',
        status: 'Evaluation Required',
        countdown: '00 : 00 : 00',
        description: 'This is a description of Course 5',
        trainer: 'Trainer E'
      }
    // Other course objects
  ];
  
  export const getAllCourses = () => courses;
  