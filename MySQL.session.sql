CREATE DATABASE TSHDB;
USE TSHDB;

-- create table
CREATE TABLE Designation (
    designation_id INT IDENTITY(300,1) PRIMARY KEY,
    designation_name VARCHAR(40) NOT NULL,
);

CREATE TABLE Skill (
    skill_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    skill_name VARCHAR(100) NOT NULL
);

CREATE TABLE Staff (
    id INT IDENTITY(100,1) PRIMARY KEY NOT NULL,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL,
    designation_id INT NOT NULL,
    training_id INT,
    FOREIGN KEY (designation_id) REFERENCES Designation(designation_id) ON DELETE CASCADE
);

CREATE TABLE Training (
    training_id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
    grade CHAR(1),
    startDate DATE,
		endDate DATE,
    completedDate DATE,
    staff_id INT,
    course_id INT,
    FOREIGN KEY (staff_id) REFERENCES Staff(id) ON DELETE CASCADE, 
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE  
);


-- insert values
INSERT INTO dbo.Designation (designation_name, department_id)
VALUES ('CNC Machine Operator', 300),
			('Tooling Operator', 300),
			('Chip Cleaner', 300),
			('Tool Crib Leader', 300),
			('Maintenance', 300),
			('Maintenance/Construction', 300),
			('Machinist', 300),
			('Conventional Grinding', 300),
			('Saw cut', 300),
			('Slim3N Leader/Machinist', 300);


INSERT INTO dbo.Course (course_name)
VALUES ('Material Planner'),
			('Operator'),
			('CNC Machinst'),
			('Packing');

INSERT INTO dbo.Staff(first_name, last_name, email, designation_id, training_id)
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
