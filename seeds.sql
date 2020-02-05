USE employerTrackerDB; 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Christine", "Camou", 1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ryanne", "Camou", 2, 1);


INSERT INTO role (title, salary, department_id)
VALUES ("Teacher", 45000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Kiddo", 360, 2);

INSERT INTO department (name)
VALUES ("School");

INSERT INTO department (name)
VALUES ("Home");