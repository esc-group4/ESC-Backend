CREATE TABLE Department (
	department_name VARCHAR(100) NOT NULL,
	department_location VARCHAR(100) NOT NULL,
	PRIMARY KEY (department_name),
    UNIQUE (department_name)
);

-- Require Department
CREATE TABLE Designation (
	designation_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(100) NOT NULL,
	position VARCHAR(100) NOT NULL,
	description VARCHAR(100) NOT NULL,
	PRIMARY  KEY (designation_id),
	FOREIGN KEY (department_name) REFERENCES Department(department_name),
    UNIQUE (position)
);

-- Require Designation -> Department
CREATE TABLE Staff (
	staff_id INT NOT NULL AUTO_INCREMENT,
    staff_name VARCHAR(100) NOT NULL,
    staff_email VARCHAR(100) NOT NULL,
    staff_password VARCHAR(100) NOT NULL,
    staff_hpNum INT,
    designation_id INT NOT NULL,
    UNIQUE (staff_name),
    PRIMARY KEY (staff_id),
	FOREIGN KEY (designation_id) REFERENCES Designation(designation_id)
);

CREATE TABLE Skill (
	skill_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (skill_name),
    UNIQUE (skill_name)
);

-- Require Skill
CREATE TABLE Course (
	course_name VARCHAR(100) NOT NULL UNIQUE,
    providerName VARCHAR(100) NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (course_name),
    FOREIGN KEY (skill_name) REFERENCES Skill(skill_name)
);

-- Require Course -> Skill
-- Reequire Department
CREATE TABLE TrainingRequest (
	request_id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL,
    generatedDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    reasons VARCHAR(100),
    completedDateTime DATETIME,
    status BOOL DEFAULT 0 NOT NULL,
    startDate DATE,
    endDate DATE,
    trainerEmail VARCHAR(100),
    PRIMARY KEY (request_id),
	department_name VARCHAR(100) NOT NULL,
	FOREIGN KEY (department_name) REFERENCES Department(department_name),
    course_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (course_name) REFERENCES Course(course_name),
    UNIQUE (request_id)
);

-- Require Staff -> Designation -> Department
-- Require TrainingRequest -> Course -> Skill
CREATE TABLE Training (
	grade VARCHAR(2),
    attendance BOOL DEFAULT 0 NOT NULL,
    request_id INT NOT NULL,
	FOREIGN KEY (request_id) REFERENCES TrainingRequest(request_id),
    staff_id int NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
);