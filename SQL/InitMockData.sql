-- Will only work right after Create Table as Training Required staff_id and request_id which are auto incremented --
-- Mock Data

-- Skills (15)
INSERT INTO Skill (skill_name) VALUES 
('AED'),
('ERP'),
('Microsoft Office'),
('Cybersecurity'),
('Project Management'),
('Data Analysis'),
('Customer Service'),
('Machine Learning'),
('Digital Marketing'),
('Agile Methodology'),
('Cloud Computing'),
('Business Intelligence'),
('Leadership'),
('Time Management'),
('Negotiation');

-- Courses (15)
INSERT INTO Course (course_name, providerName, skill_name, course_description, course_location) VALUES 
('AED 2024','SUTD', 'AED', 'Life saving course', '3 Fusionopolis Link, Singapore 138542'),
('Cybersecurity 2024','SUTD', 'Cybersecurity', 'Network security basics', '8 Somapah Rd, Singapore 487372'),
('ERP Fundamentals', 'NUS', 'ERP', 'Introduction to Enterprise Resource Planning', '21 Lower Kent Ridge Rd, Singapore 119077'),
('Advanced Excel', 'Microsoft', 'Microsoft Office', 'Advanced spreadsheet techniques', '182 Cecil Street, Singapore 069547'),
('Project Management Professional', 'PMI', 'Project Management', 'PMP certification preparation', '80 Middle Road, Singapore 188966'),
('Data Science Bootcamp', 'Datacamp', 'Data Analysis', 'Comprehensive data analysis course', '79 Anson Road, Singapore 079906'),
('Customer Experience Mastery', 'SHATEC', 'Customer Service', 'Enhancing customer satisfaction', '21 Bukit Batok Street 22, Singapore 659589'),
('Machine Learning Fundamentals', 'NTU', 'Machine Learning', 'Introduction to ML algorithms', '50 Nanyang Ave, Singapore 639798'),
('Digital Marketing Strategy', 'Google', 'Digital Marketing', 'Online marketing techniques', '70 Pasir Panjang Road, Singapore 117371'),
('Agile Scrum Master', 'Scrum Alliance', 'Agile Methodology', 'Agile project management', '1 Raffles Place, Singapore 048616'),
('AWS Certified Solutions Architect', 'Amazon', 'Cloud Computing', 'Cloud architecture design', '23 Church Street, Singapore 049481'),
('Power BI Masterclass', 'Microsoft', 'Business Intelligence', 'Data visualization techniques', '182 Cecil Street, Singapore 069547'),
('Leadership Development Program', 'CCL', 'Leadership', 'Developing leadership skills', '89 Neil Road, Singapore 088849'),
('Time Management Workshop', 'FranklinCovey', 'Time Management', 'Productivity improvement techniques', '1 Raffles Place, Singapore 048616'),
('Negotiation Skills', 'Harvard Business School', 'Negotiation', 'Advanced negotiation techniques', '51 Bras Basah Road, Singapore 189554');

-- Departments (10)
INSERT INTO Department (department_name, department_location) VALUES 
('Manufacturing', 'AMK'),
('Admin', 'Bedok'),
('Engineering', 'Jurong'),
('Sales', 'CBD'),
('IT', 'Changi'),
('Human Resources', 'Tanjong Pagar'),
('Finance', 'Raffles Place'),
('Marketing', 'Orchard'),
('Customer Support', 'Novena'),
('Research & Development', 'One-North');

-- Training Requests (7)
INSERT INTO TrainingRequest (type, department_name, course_name, startDate, endDate, trainerEmail) VALUES 
('External', 'Manufacturing', 'AED 2024', CURDATE(), CURDATE() + INTERVAL 1 DAY, "hoxiaoyang321@gmail.com"),
('External', 'Manufacturing', 'AED 2024', CURDATE() + INTERVAL 7 DAY, CURDATE() + INTERVAL 8 DAY, "hoxiaoyang321@gmail.com"),
('Internal', 'IT', 'Cybersecurity 2024', CURDATE() + INTERVAL 14 DAY, CURDATE() + INTERVAL 16 DAY, "hoxiaoyang321@gmail.com"),
('External', 'Sales', 'Digital Marketing Strategy', CURDATE() + INTERVAL 21 DAY, CURDATE() + INTERVAL 23 DAY, "hoxiaoyang321@gmail.com"),
('Internal', 'Engineering', 'ERP Fundamentals', CURDATE() + INTERVAL 28 DAY, CURDATE() + INTERVAL 30 DAY, "hoxiaoyang321@gmail.com"),
('External', 'Finance', 'Advanced Excel', CURDATE() + INTERVAL 35 DAY, CURDATE() + INTERVAL 36 DAY, "hoxiaoyang321@gmail.com"),
('Internal', 'Human Resources', 'Leadership Development Program', CURDATE() + INTERVAL 42 DAY, CURDATE() + INTERVAL 44 DAY, "hoxiaoyang321@gmail.com"),
('External', 'Human Resources', 'Leadership Development Program', CURDATE() + INTERVAL 1 DAY, CURDATE() + INTERVAL 44 DAY, "hoxiaoyang321@gmail.com");

-- Designations (10, one for each department)
INSERT INTO Designation (department_name, position, description) VALUES 
('Manufacturing', 'Operator', 'Operate Machine'),
('Manufacturing', 'HOD', 'Head of Department for Manufacturing'),
('Admin', 'HR', 'Training and Development HR'),
('Engineering', 'Engineer', 'Design and maintain systems'),
('Sales', 'Sales Representative', 'Manage client accounts'),
('IT', 'System Administrator', 'Manage IT infrastructure'),
('Human Resources', 'HR Manager', 'Oversee HR functions'),
('Finance', 'Financial Analyst', 'Analyze financial data'),
('Marketing', 'Marketing Specialist', 'Develop marketing strategies'),
('Customer Support', 'Support Representative', 'Assist customers'),
('Research & Development', 'Research Scientist', 'Conduct research');

-- Staff (40)
INSERT INTO Staff (staff_name, staff_email, designation_id, firebase_uid, staff_hpNum, staff_password) VALUES 
('Benny', 'benny@TSH.com', 1, 'abc123', NULL, "password"),
('Daniel', 'daniel@TSH.com', 1, 'abc127', NULL, "password"),
('Albert', 'albert@TSH.com', 1, 'abc128', NULL, "password"),
('Javier Tan', 'javiertan@TSH.com', 2, 'abc124', NULL, "password"),
('Xiaoyang', 'hoxiaoyang321@gmail.com', 3, 'abc125', 89116194, "password"),
('Emma Lee', 'emma@TSH.com', 4, 'abc126', 91234567, "password"),
('Michael Tan', 'michael@TSH.com', 5, 'abc129', 92345678, "password"),
('Sarah Wong', 'sarah@TSH.com', 6, 'abc130', 93456789, "password"),
('David Lim', 'david@TSH.com', 7, 'abc131', 94567890, "password"),
('Lisa Ng', 'lisa@TSH.com', 8, 'abc132', 95678901, "password"),
('Ryan Goh', 'ryan@TSH.com', 9, 'abc133', 96789012, "password"),
('Olivia Chua', 'olivia@TSH.com', 10, 'abc134', 97890123, "password"),
('Ethan Teo', 'ethan@TSH.com', 11, 'abc135', 98901234, "password"),
('Sophia Koh', 'sophia@TSH.com', 1, 'abc136', 99012345, "password"),
('William Yeo', 'william@TSH.com', 2, 'abc137', 90123456, "password"),
('Isabella Tan', 'isabella@TSH.com', 3, 'abc138', 91234568, "password"),
('James Lee', 'james@TSH.com', 4, 'abc139', 92345679, "password"),
('Mia Lim', 'mia@TSH.com', 5, 'abc140', 93456780, "password"),
('Benjamin Ng', 'benjamin@TSH.com', 6, 'abc141', 94567891, "password"),
('Charlotte Goh', 'charlotte@TSH.com', 7, 'abc142', 95678902, "password"),
('Lucas Chua', 'lucas@TSH.com', 8, 'abc143', 96789013, "password"),
('Amelia Teo', 'amelia@TSH.com', 9, 'abc144', 97890124, "password"),
('Henry Koh', 'henry@TSH.com', 10, 'abc145', 98901235, "password"),
('Ava Yeo', 'ava@TSH.com', 11, 'abc146', 99012346, "password"),
('Alexander Tan', 'alexander@TSH.com', 1, 'abc147', 90123457, "password"),
('Evelyn Lee', 'evelyn@TSH.com', 2, 'abc148', 91234569, "password"),
('Daniel Lim', 'daniel2@TSH.com', 3, 'abc149', 92345680, "password"),
('Sofia Ng', 'sofia@TSH.com', 4, 'abc150', 93456781, "password"),
('Matthew Goh', 'matthew@TSH.com', 5, 'abc151', 94567892, "password"),
('Chloe Chua', 'chloe@TSH.com', 6, 'abc152', 95678903, "password"),
('Andrew Teo', 'andrew@TSH.com', 7, 'abc153', 96789014, "password"),
('Zoe Koh', 'zoe@TSH.com', 8, 'abc154', 97890125, "password"),
('Christopher Yeo', 'christopher@TSH.com', 9, 'abc155', 98901236, "password"),
('Lily Tan', 'lily@TSH.com', 10, 'abc156', 99012347, "password"),
('Joseph Lee', 'joseph@TSH.com', 11, 'abc157', 90123458, "password"),
('Grace Lim', 'grace@TSH.com', 1, 'abc158', 91234570, "password"),
('Samuel Ng', 'samuel@TSH.com', 2, 'abc159', 92345681, "password"),
('Audrey Goh', 'audrey@TSH.com', 3, 'abc160', 93456782, "password"),
('Dylan Chua', 'dylan@TSH.com', 4, 'abc161', 94567893, "password"),
('Natalie Teo', 'natalie@TSH.com', 5, 'abc162', 95678904, "password");

-- Training (15)
INSERT INTO Training (staff_id, request_id) VALUES 
(1,1),
(2,1),
(3,1),
(5,2),
(6,3),
(7,3),
(8,4),
(9,4),
(10,5),
(11,5),
(12,6),
(13,6),
(14,7),
(15,7);