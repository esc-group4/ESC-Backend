// models/course.js
const courses = [
  {
      id: 1,
      title: 'Course 1',
      deadline: '2024-07-27',
      info: 'Details about Course 1',
      location: 'Location A',
      status: 'Upcoming',
      countdown: '07 : 06 : 59',
      description: 'This is a description of Course 1',
      trainer: 'Trainer A',
      email: 'javiertan@tsh.com',
      name: 'Javier Tan'
    },
    {
      id: 2,
      title: 'Course 2',
      deadline: '2024-08-05',
      info: 'Details about Course 2',
      location: 'Location B',
      status: 'Evaluation Required',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 2',
      trainer: 'Trainer B',
      email: 'javiertan@tsh.com',
      name: 'Javier Tan'
    },
    {
      id: 3,
      title: 'Course 3',
      deadline: '2024-08-25',
      info: 'Details about Course 3',
      location: 'Location C',
      status: 'Completed',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 3',
      trainer: 'Trainer C',
      email: 'javiertan@tsh.com',
      name: 'Javier Tan'
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
      trainer: 'Trainer D',
      email: 'javiertan@tsh.com',
      name: 'Javier Tan'
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
      trainer: 'Trainer E',
      email: 'javiertan@tsh.com',
      name: 'Javier Tan'
    },
    {
      id: 6,
      title: 'Course 6',
      deadline: '2024-11-15',
      info: 'Details about Course 6',
      location: 'Location F',
      status: 'Upcoming',
      countdown: '00 : 00 : 00',
      description: 'This is a description of Course 6',
      trainer: 'Trainer F',
      email: 'javiertan@tsh.com',
      name: 'Javier Tan'
    }
  // Other course objects
];

export const getAllCourses = () => courses;

export const getCoursesByEmail = (email) => {
  return courses.filter(course => course.email === email);
};

export const updateCourseStatus = (id, status) => {
  const course = courses.find(course => course.id === id);
  if (course) {
    course.status = status;
    return course;
  }
  return null;
};
