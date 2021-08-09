USE employeesDB;

INSERT INTO department (name)
VALUES ("Innovation");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("System Analyst", 130000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 70000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Counsel", 110000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("HR Manager", 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Gihts", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Laban", "Kun", 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pamenas", "Kim", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sofia", "Linda", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sheila", "Cate", 5, null);


