CREATE DATABASE TSHDB;
USE TSHDB;

-- Create Department table
CREATE TABLE Department (
	department_name VARCHAR(100) NOT NULL,
	department_location VARCHAR(100) NOT NULL,
	PRIMARY KEY(department_name),
	UNIQUE(department_name)
);

-- Create Designation table references from the Department
CREATE TABLE Designation (
	position VARCHAR(100) NOT NULL,
	description VARCHAR(100) NOT NULL,
	super VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	PRIMARY KEY (position),
    	FOREIGN KEY (department_name) REFERENCES Department(department_name) ON DELETE CASCADE,
	UNIQUE(position)
);

-- Create Staff table references from the Designation
CREATE TABLE Staff (
	staff_id INT NOT NULL AUTO_INCREMENT,
	staff_first_name VARCHAR(100) NOT NULL,
	staff_last_name VARCHAR(100) NOT NULL,
	staff_email VARCHAR(100) NOT NULL,
	position VARCHAR(100) NOT NULL,
	training_id INT,
	PRIMARY KEY (staff_id),
	FOREIGN KEY (position) REFERENCES Designation(position) ON DELETE CASCADE,
	FOREIGN KEY (training_id) REFERENCES Training(training_id),
	UNIQUE (staff_id)
);

CREATE TABLE Skill (
    	skill_name VARCHAR(100) NOT NULL,
	PRIMARY KEY (skill_name),
	UNIQUE(skill_name)
);

--  Create Course table references from the Skill
CREATE TABLE Course (
	course_id INT IDENTITY (400, 1) NOT NULL,
	course_name VARCHAR(100) NOT NULL,
	course_providerName VARCHAR(100) NOT NULL,
	skill_name VARCHAR(100) NOT NULL,
	PRIMARY KEY (course_id),
	FOREIGN KEY (skill_name) REFERENCES Skill(skill_name),
	UNIQUE(course_id),
);

-- CoursePlan is a child table of Training table
CREATE TABLE Training (
	training_id INT IDENTITY(600,1) NOT NULL, --not unique so multiple staffs attend a training
	grade CHAR(1),
	startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	endDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	completedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	staff_id INT, -- able to have no staff in training
	course_id INT, -- able to have no course in training because of no staff
	PRIMARY KEY (training_id),
	FOREIGN KEY (staff_id) REFERENCES Staff(id) ON DELETE CASCADE, 
	FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE
);

CREATE TABLE TrainingRequest (
	request_id INT NOT NULL AUTO_INCREMENT,
	training_type VARCHAR(100) NOT NULL,
	training_reason VARCHAR(100),
	generatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	status BOOL DEFAULT 0 NOT NULL,
	PRIMARY KEY (request_id),
	department_name VARCHAR(100) NOT NULL,
	course_id INT NOT NULL,
	FOREIGN KEY (department_name) REFERENCES Department(department_name),
	FOREIGN KEY (course_id) REFERENCES Course(course_id),
	UNIQUE (request_id)
);

-- insert values
INSERT INTO dbo.Designation (department_name, department_location)
VALUES ('CNC Machine Operator', 'Busan'),
	('Tooling Operator', 'Tokyo'),
	('Chip Cleaner', 'Taipei'),
	('Tool Crib Leader', 'Kuala Lumpur'),
	('Maintenance/Construction', 'Shenzhen'),
	('Machinist', 'Guangzhou'),
	('Conventional Grinding', 'Pohang'),
	('Saw cut', 'Yokohama'),
	('Slim3N Leader/Machinist', 'Kaohsiung');


INSERT INTO dbo.Course (course_name)
VALUES ('Material Planner'),
	('Operator'),
	('CNC Machinst'),
	('Packing');

INSERT INTO dbo.Staff(staff_first_name, staff_last_name, staff_email, position, training_id)
VALUES ('Javier', 'Tan', 'javiertan@TSH.com', 202, 609),
	 ('Vivian', 'Quek', 'QuekVivian@TSH.com', 208, 604),
	 ('Jun Jie', 'Wang', 'Junjie20@TSH.com', 209, 603),
	 ('Hwee Ru', 'Ong', 'OnghweeRu20@TSH.com', 202, 602),
	 ('Tommy', 'Lim', 'tomlim@TSH.com', 205, 601);


INSERT INTO Training (grade, startDate, endDate, staff_id, course_id)
VALUES ('A', '2024-05-21', '2024-07-21', 104, 500),
	 ('A', '2024-02-03', '2024-03-09', 103, 503),
	 ('A', '2024-02-05', '2024-10-07', 102, 503),			 
	 ('B', '2024-07-29', '2023-07-11', 101, 501);
