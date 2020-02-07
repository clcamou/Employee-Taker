USE employerTrackerDB; 

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Christine", "Camou", 1, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Ryanne", "Camou-Tayla", 2, 1);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Phil", "Friend", 3, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Sound Engineer", 30000, 3);

INSERT INTO department (id, division)
VALUES (4, "Local News");


INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Teacher", 45000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Kiddo", 360, 2);

INSERT INTO department (id, division)
VALUES (1, "School");

INSERT INTO department (id, division)
VALUES (2, "Home");

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Kileen", "Tayla", 3, 1);

INSERT INTO role (id, title, salary, department_id)
Value (3, "Teacher", 35000, 1);