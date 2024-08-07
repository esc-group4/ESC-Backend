-- Skill (15 skills)
INSERT INTO Skill (skill_name) VALUES 
('AED'),
('ERP'),
('Microsoft Office'),
('Project Management'),
('Data Analysis'),
('Customer Service'),
('Machine Learning'),
('Cybersecurity'),
('Digital Marketing'),
('Agile Methodology'),
('Cloud Computing'),
('Business Intelligence'),
('Leadership'),
('Time Management'),
('Negotiation');

-- Course (15 courses)
INSERT INTO Course (course_name, providerName, skill_name, course_description, course_location) VALUES 
('AED 2024','SUTD', 'AED', 'Life Saving Course', '3 Fusionopolis Link, Singapore 138542'),
('Intro to ERP', 'SUTD', 'ERP', 'Traffic Management', '8 Somapah Road, Singapore 487372'),
('Microsoft Office Advanced', 'SUTD', 'Microsoft Office', 'Advanced Excel', '10 Collyer Quay, Singapore 049315'),
('PMP Certification', 'PMI', 'Project Management', 'Project Management Professional', '1 Marina Boulevard, Singapore 018989'),
('Data Science Bootcamp', 'NUS', 'Data Analysis', 'Intensive Data Science Course', '21 Lower Kent Ridge Rd, Singapore 119077'),
('Customer Experience Mastery', 'SHATEC', 'Customer Service', 'Enhancing Customer Satisfaction', '21 Bukit Batok Street 22, Singapore 659589'),
('Machine Learning Fundamentals', 'NTU', 'Machine Learning', 'Introduction to ML Algorithms', '50 Nanyang Ave, Singapore 639798'),
('Cybersecurity Essentials', 'CISCO', 'Cybersecurity', 'Network Security Basics', '80 Pasir Panjang Road, Singapore 117372'),
('Digital Marketing Strategy', 'Google', 'Digital Marketing', 'Online Marketing Techniques', '70 Pasir Panjang Road, Singapore 117371'),
('Agile Scrum Master', 'Scrum Alliance', 'Agile Methodology', 'Agile Project Management', '1 Raffles Place, Singapore 048616'),
('AWS Certified Solutions Architect', 'Amazon', 'Cloud Computing', 'Cloud Architecture Design', '23 Church Street, Singapore 049481'),
('Power BI Masterclass', 'Microsoft', 'Business Intelligence', 'Data Visualization', '182 Cecil Street, Singapore 069547'),
('Leadership Development Program', 'CCL', 'Leadership', 'Developing Leadership Skills', '89 Neil Road, Singapore 088849'),
('Effective Time Management', 'FranklinCovey', 'Time Management', 'Productivity Improvement', '1 Raffles Place, Singapore 048616'),
('Negotiation Skills Workshop', 'Harvard Business School', 'Negotiation', 'Advanced Negotiation Techniques', '51 Bras Basah Road, Singapore 189554');

-- Department (10 departments)
INSERT INTO Department (department_name, department_location) VALUES 
('Manufacturing', 'AMK'),
('Engineering', 'Jurong'),
('Sales', 'CBD'),
('IT', 'Changi'),
('Human Resources', 'Tanjong Pagar'),
('Finance', 'Raffles Place'),
('Marketing', 'Orchard'),
('Customer Support', 'Novena'),
('Research & Development', 'One-North'),
('Operations', 'Woodlands');

-- TrainingRequest (7 requests)
INSERT INTO TrainingRequest (type, department_name, course_name, startDate, endDate) VALUES 
('External', 'Manufacturing', 'AED 2024', CURDATE(), CURDATE() + INTERVAL 1 DAY),
('Internal', 'Engineering', 'Intro to ERP', CURDATE() + INTERVAL 1 WEEK, CURDATE() + INTERVAL 1 DAY),
('External', 'Sales', 'Microsoft Office Advanced', CURDATE() + INTERVAL 3 MONTH , CURDATE() + INTERVAL 3 DAY),
('External', 'IT', 'Cybersecurity Essentials', CURDATE(), CURDATE() + INTERVAL 2 DAY),
('Internal', 'Human Resources', 'Customer Experience Mastery', CURDATE() + INTERVAL 3 DAY, CURDATE() + INTERVAL 1 DAY),
('External', 'Finance', 'Data Science Bootcamp', CURDATE() + INTERVAL 1 MONTH, CURDATE() + INTERVAL 5 DAY),
('External', 'Marketing', 'Digital Marketing Strategy', CURDATE(), CURDATE() + INTERVAL 2 DAY);

-- Designation (10 designations, one for each department)
INSERT INTO Designation (department_name, position, description) VALUES 
('Manufacturing', 'Operator', 'Operate Machine'),
('Engineering', 'Engineer', 'Maintenance System'),
('Sales', 'Account Manager', 'Managing Account'),
('IT', 'System Administrator', 'Manage IT Infrastructure'),
('Human Resources', 'HR Manager', 'Oversee HR Functions'),
('Finance', 'Financial Analyst', 'Analyze Financial Data'),
('Marketing', 'Marketing Specialist', 'Develop Marketing Strategies'),
('Customer Support', 'Support Representative', 'Assist Customers'),
('Research & Development', 'Research Scientist', 'Conduct Research'),
('Operations', 'Operations Manager', 'Manage Daily Operations');

-- Staff (40 staff members)
INSERT INTO Staff (staff_name, staff_email, staff_password, designation_id, firebase_uid) VALUES 
('Benny', 'benny@gmail.com', 'password', 1, 'abc123'),
('Alice', 'alice@gmail.com', 'password123', 2, 'def456'),
('John', 'john@gmail.com', 'password456', 3, 'ghi789'),
('Emma', 'emma@gmail.com', 'password789', 4, 'jkl012'),
('Michael', 'michael@gmail.com', 'passwordabc', 5, 'mno345'),
('Sarah', 'sarah@gmail.com', 'passworddef', 6, 'pqr678'),
('David', 'david@gmail.com', 'passwordghi', 7, 'stu901'),
('Lisa', 'lisa@gmail.com', 'passwordjkl', 8, 'vwx234'),
('Ryan', 'ryan@gmail.com', 'passwordmno', 9, 'yz567a'),
('Olivia', 'olivia@gmail.com', 'passwordpqr', 10, 'bcd890'),
('Daniel', 'daniel@gmail.com', 'passwordstu', 1, 'efg123'),
('Sophia', 'sophia@gmail.com', 'passwordvwx', 2, 'hij456'),
('Matthew', 'matthew@gmail.com', 'passwordyz1', 3, 'klm789'),
('Emily', 'emily@gmail.com', 'password234', 4, 'nop012'),
('Andrew', 'andrew@gmail.com', 'password567', 5, 'qrs345'),
('Ava', 'ava@gmail.com', 'password890', 6, 'tuv678'),
('William', 'william@gmail.com', 'passwordabc1', 7, 'wxy901'),
('Isabella', 'isabella@gmail.com', 'passworddef2', 8, 'zab234'),
('James', 'james@gmail.com', 'passwordghi3', 9, 'cde567'),
('Mia', 'mia@gmail.com', 'passwordjkl4', 10, 'fgh890'),
('Benjamin', 'benjamin@gmail.com', 'passwordmno5', 1, 'ijk123'),
('Charlotte', 'charlotte@gmail.com', 'passwordpqr6', 2, 'lmn456'),
('Jacob', 'jacob@gmail.com', 'passwordstu7', 3, 'opq789'),
('Amelia', 'amelia@gmail.com', 'passwordvwx8', 4, 'rst012'),
('Ethan', 'ethan@gmail.com', 'passwordyz9', 5, 'uvw345'),
('Harper', 'harper@gmail.com', 'password0123', 6, 'xyz678'),
('Alexander', 'alexander@gmail.com', 'password4567', 7, 'abc901'),
('Abigail', 'abigail@gmail.com', 'password8901', 8, 'def234'),
('Henry', 'henry@gmail.com', 'passwordabcd', 9, 'ghi567'),
('Emily', 'emily2@gmail.com', 'passwordefgh', 10, 'jkl890'),
('Samuel', 'samuel@gmail.com', 'passwordijkl', 1, 'mno123'),
('Elizabeth', 'elizabeth@gmail.com', 'passwordmnop', 2, 'pqr456'),
('Joseph', 'joseph@gmail.com', 'passwordqrst', 3, 'stu789'),
('Avery', 'avery@gmail.com', 'passworduvwx', 4, 'vwx012'),
('Christopher', 'christopher@gmail.com', 'passwordyzab', 5, 'yza345'),
('Sofia', 'sofia@gmail.com', 'passwordcdef', 6, 'bcd678'),
('Andrew', 'andrew2@gmail.com', 'passwordghij', 7, 'efg901'),
('Scarlett', 'scarlett@gmail.com', 'passwordklmn', 8, 'hij234'),
('David', 'david2@gmail.com', 'passwordopqr', 9, 'klm567'),
('Grace', 'grace@gmail.com', 'passwordstuv', 10, 'nop890');

-- Training Records (15 records)
INSERT INTO Training (staff_id, request_id, attendance) VALUES
(1, 1, TRUE),
(2, 1, TRUE),
(3, 2, FALSE),
(4, 2, TRUE),
(5, 3, TRUE),
(6, 3, FALSE),
(7, 4, TRUE),
(8, 4, TRUE),
(9, 5, FALSE),
(10, 5, TRUE),
(11, 6, TRUE),
(12, 6, FALSE),
(13, 7, TRUE),
(14, 7, TRUE),
(15, 1, FALSE);