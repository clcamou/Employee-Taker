DROP DATABASE IF EXISTS employerTakerB;

-- create the database employerTakerDB and specified for use

CREATE DATABASE employerTrackerDB;

USE employerTakerDB;

-- create the table employees

CREATE TABLE employees (
    id int(10) primary key AUTO_INCREMENT not null, 
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INT(10),
    manager_id INT (10) null, 
);

CREATE TABLE  role(
    id INT(10) primary key AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30), 
    salary DECIMAL,
    department_id INT(10)
);

CREATE TABLE department (
    id INT primary key AUTO_INCREMENT NOT NULL, 
    name VARCHAR(30)
);