-- Will only work right after Create Table as Training Required staff_id and request_id which are auto incremented --

-- Mock Data
INSERT INTO Skill (skill_name) VALUES ('AED'), ('ERP'), ('Microsoft Office');

INSERT INTO Course (course_name, providerName, skill_name) VALUES ('AED 2024','SUTD', 'AED');

INSERT INTO Department (department_name, department_location) VALUES ('Manufacturing', 'AMK');

INSERT INTO TrainingRequest (type, department_name, course_name) VALUES ('External', 'Manufacturing', 'AED 2024');

INSERT INTO Designation (department_name, position, description) VALUES ('Manufacturing', 'Operator','Operate Machine');

INSERT INTO Designation (department_name, position, description) VALUES ('Manufacturing', 'Engineering Manager','Opearte Machine');

INSERT INTO Staff (staff_name, staff_email, staff_password, designation_id, firebase_uid) values ('Benny', 'benny@gmail.com', 'password', 1, "abc123");

INSERT INTO Staff (staff_name, staff_email, staff_password, designation_id, firebase_uid) values ('Javier Tan', 'javiertan@tsh.com', 'password', 2, "abc124");

INSERT INTO Training (staff_id, request_id) VALUES (1,1);