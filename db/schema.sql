-- Drops the employees_db if it exists currently --
DROP DATABASE IF EXISTS employees_db;

-- Creates the employees_db database --
CREATE DATABASE employees_db;

-- Use employees_db database--
USE employees_db;

-- Creates the table "department" within employees_db --
CREATE TABLE department (
  id INT NOT NULL,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

