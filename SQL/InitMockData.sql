-- Will only work right after Create Table as Training Required staff_id and request_id which are auto incremented --

-- Mock Data
INSERT INTO Skill (skill_name) VALUES 
('AED'),
('ERP'),
('Microsoft Office'),
('Cybersecurity');

INSERT INTO Course (course_name, providerName, skill_name, course_description, course_location) VALUES ('AED 2024','SUTD', 'AED', "Life saving course", "3 Fusionopolis Link, Singapore 138542");

INSERT INTO Course (course_name, providerName, skill_name, course_description, course_location) VALUES ('Cybersecurity 2024','SUTD', 'Cybersecurity', "Life saving course", "8 Somapah Rd, Singapore 487372");

INSERT INTO Department (department_name, department_location) VALUES ('Manufacturing', 'AMK');

INSERT INTO Department (department_name, department_location) VALUES ('Admin', 'Bedok');

INSERT INTO TrainingRequest (type, department_name, course_name, startDate, endDate) VALUES ('External', 'Manufacturing', 'AED 2024', CURDATE(), CURDATE() + INTERVAL 1 DAY);

INSERT INTO TrainingRequest (type, department_name, course_name, startDate, endDate) VALUES ('External', 'Manufacturing', 'AED 2024', CURDATE() + INTERVAL 7 DAY, CURDATE() + INTERVAL 8 DAY);

INSERT INTO Designation (department_name, position, description) VALUES ('Manufacturing', 'Operator', 'Operate Machine');

INSERT INTO Designation (department_name, position, description) VALUES ('Manufacturing', 'HOD', 'Head of Department for Manufacturing');

INSERT INTO Designation (department_name, position, description) VALUES ('Admin', 'HR', 'Training and Development HR');

INSERT INTO Staff (staff_name, staff_email, designation_id, firebase_uid) values ('Benny', 'benny@example.com', 1, "abc123");

INSERT INTO Staff (staff_name, staff_email, designation_id, firebase_uid) values ('Daniel', 'daniel@example.com', 1, "abc127");

INSERT INTO Staff (staff_name, staff_email, designation_id, firebase_uid) values ('Albert', 'albert@example.com', 1, "abc128");

INSERT INTO Staff (staff_name, staff_email, designation_id, firebase_uid) values ('Javier Tan', 'javiertan@example.com', 2, "abc124");

INSERT INTO Staff (staff_name, staff_email, designation_id, firebase_uid, staff_hpNum) values ('Xiaoyang', 'hoxiaoyang321@gmail.com', 3, "abc125", 89116194);

INSERT INTO Training (staff_id, request_id) VALUES (1,1);

INSERT INTO Training (staff_id, request_id) VALUES (2,1);

INSERT INTO Training (staff_id, request_id) VALUES (3,1);

INSERT INTO Training (staff_id, request_id) VALUES (5,2);