-- create a database and drop it if it exists

DROP DATABASE IF EXISTS gihtsemployeesDB;
CREATE database gihtsemployeesDB;

-- authorize the usage of the db
USE gihtsemployeesDB;

-- create the tables we will be using for the db
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

-- these are the roles in the table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  Salary DECIMAL(10,4) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- these are the elements in the table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

-- instruction on selecting from the tables
SELECT * FROM department;
select * from role;
SELECT * FROM employee;
