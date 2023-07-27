USE employees_db;

INSERT INTO department (department_name)
VALUES  ("Human Resources"),
        ("Engineering"),
        ("Sales"),
        ("Marketing");
       

INSERT INTO role (title, salary, deparment_id)
VALUES ("HR Manager", 70000, 1),
       ("Engineer", 80000, 2),
       ("Sales Executive", 60000, 3),
       ("Marketing Specialist", 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Smith", 2, 1),
       ("Emily", "Johnson", 3, 1),
       ("Mike", "Brown", 4, 1);
