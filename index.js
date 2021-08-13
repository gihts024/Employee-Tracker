const mysql = require('mysql');
const inquirer = require('inquirer');
const { printTable } = require('console-table-printer');
const figlet = require('figlet');
let departments;
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'gihts#@2020',
  database: 'employeesDB',
});

figlet('GIHTS Employee Manager', (err, result) => {
  console.log(err || result);
});

connection.connect((err) => {
  if (err) throw err;
  trackEmployee();
  getDepartments();
  getRoles();
  getManagers();
  getEmployees();
});

// Activate the tracking action in groups
const trackEmployee = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add departments roles, employees',
        'View departments, roles, employees',
        'View  the total utilized budget of a department',
        'update employee roles',
        'Delete departments, roles, employees',
        'Exit',
        
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add departments roles, employees':
          addAction();
          break;

        case 'View departments, roles, employees':
          viewAction();
          break;

        case  'View  the total utilized budget of a department':
          // budgetAction();
          console.log("success")
          break;
        case 'update employee roles':
          updateAction();
          break;

        case 'Delete departments, roles, employees':
            deleteAction();
            break;

        case 'Exit':
              exitAction();
              break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

//  Get departments

getRoles = () => {
  connection.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    roles = res;
    // console.table(roles);
  })
};

getDepartments = () => {
  connection.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    departments = res;
    // console.log(departments);
  })
};

getManagers = () => {
  connection.query("SELECT id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS managers FROM employee", (err, res) => {
    if (err) throw err;
    managers = res;
    // console.table(managers);
  })
};

getEmployees = () => {
  connection.query("SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee", (err, res) => {
    if (err) throw err;
    employees = res;
    // console.table(employees);
  })
};

// activate the addition action
const addAction = () => {
  inquirer
    .prompt({
      name: 'add',
      type: 'rawlist',
      message: 'What would you like to add?',
      choices: [
        'Add departments',
        'Add employee roles',
        'Add employees',
      ],
    })
    .then((answer) => {
      switch (answer.add) {
        case 'Add departments':
          addDepartments();
          break;

        case 'Add employee roles':
          addRoles();
          break;

        case 'Add employees':
          addEmployees();
          break;

        default:
          console.log(`Invalid action: ${answer.add}`);
          break;
      }
    });
};

// activate the view action
const viewAction = () => {
  inquirer
    .prompt({
      name: 'view',
      type: 'rawlist',
      message: 'What would you like to view?',
      choices: [
        'View departments',
        'View roles',
        'view employees',
        'view employees by manager',
         
      ],
    })
    .then((answer) => {
      switch (answer.view) {
        case 'View departments':
          viewDepartments();
          break;

        case 'View roles':
          viewRoles();
          break;

        case 'view employees':
          viewEmployees();
          break;
        case 'view employees by manager':
        //  viewEmployeesByManager() ;
        console.log("employees ad")

        default:
          console.log(`Invalid view: ${answer.view}`);
          break;
      }
    });
};


// budgetAction();


// activate the update

const updateAction = () => {
  inquirer
    .prompt({
      name: 'update',
      type: 'rawlist',
      message: 'What would you like to update?',
      choices: [
        'update employee roles',
        'update employees manager',
      ],
    })
    .then((answer) => {
      switch (answer.update) {

        case 'update employee roles':
          updateEmployee();
          break;

        case 'update employees manager':
          updateEmployeesManager();
          break;

        default:
          console.log(`Invalid update: ${answer.update}`);
          break;
      }
    });
};

// activate Delete

const deleteAction = () => {
  inquirer
    .prompt({
      name: 'delete',
      type: 'rawlist',
      message: 'What would you like to delete?',
      choices: [
        'delete departments',
        'delete roles',
        'delete employees',
      ],
    })
    .then((answer) => {
      switch (answer.delete) {
        case 'delete departments':
          deleteDepartments();
          break;

        case 'delete roles':
          deleteRoles();
          break;

        case 'delete employees':
          deleteEmployees();
          break;

        default:
          console.log(`Invalid delete: ${answer.delete}`);
          break;
      }
    });
};

const exitAction = () => {
  figlet('GoodBye', (err, result) => {
    console.log(err || result);
});
 connection.end();
};
// run the add functions
const addDepartments = () => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Which department would you want to add?',
    })
    .then((answer) => {
      const query = 'INSERT INTO department name VALUES WHERE ?';
      connection.query(query, { department: answer.department }, (err, res) => {
        console.log(`You succefully added: ` + answer.department );
        trackEmployee()
      });
    });
};

const addRoles = () => {
  inquirer
    .prompt([{
      name: 'title',
      type: 'input',
      message: 'please enter the title to add ',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'please enter the salary for this title',
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'please enter the department ID for this title',
    }])
    .then((answer) => {
      const query = 'INSERT INTO role, (title, salary, department_id) VALUES WHERE ?';
      connection.query(query, { title: answer.title, salary: answer.salary, department_id: answer.department_id }, (err, res) => {
        console.log(`You succefully added: ` + answer.title );
        trackEmployee();
      });
    });
};

const addEmployees = () => {
  inquirer
    .prompt([{
      name: 'first_name',
      type: 'input',
      message: 'please enter the first_Name ',
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'please enter the last_Name',
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'please enter ther role_id',
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'please enter ther manager_id',
    },
  ]).then((answer) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE WHERE ?';
      connection.query(query, { first_name: answer.first_name, last_name:answer.last_name, role_id:answer.role_id, manager_id:answer.manager_id}, (err, res) => {
        console.log(`You succefully added: ` + answer.first_name );

        trackEmployee();
      });
    });
};

// run the viewfunctions

const viewDepartments = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    figlet('Departments', (err, result) => {
      console.log(err || result);
    });

    printTable(res);
    trackEmployee();
  });
};

const viewRoles = () => {
  const query = "SELECT  r.id, r.title, r.salary, d.name as Department_Name FROM role AS r INNER JOIN department AS d ON r.department_id = d.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    figlet('Roles', (err, result) => {
      console.log(err || result);
    });

    printTable(res);
    trackEmployee();
      });
};

const viewEmployees = () => {
      const query = 'SELECT e.id, e.first_name, e.last_name, d.name AS department, r.title, r.salary, CONCAT_WS(" ", m.first_name, m.last_name) AS manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY e.id ASC';
      connection.query(query, (err, res) => {
        if (err) throw err;
        figlet('Employees', (err, result) => {
          console.log(err || result);
        });
      printTable(res);
      trackEmployee();
    
      });
};

// View employees by Manager

// viewEmployeesByManager();


// run the update functions

const updateEmployee =() =>{

  let employeeList = [];

  for ( i = 0; i < employees.length; i++) {
    employeeList.push(Object(employees[i]));
  }
  inquirer.prompt([
    {
      name: "updateRole",
      type: "list",
      message: "whose role would you want to update?",
      choices: function () {
        var selectedEmployee = [];
        for (var i = 0; i < employeeList.length; i++) {
          selectedEmployee.push(employeeList[i].Employee_Name);
        }
        return selectedEmployee;
      }
    }
  ]).then(answer => {
    let rolesList = [];
    for (i = 0; i < roles.length; i++) {
      rolesList.push(Object(roles[i]));
    };
    for (i = 0; i < employeeList.length; i++) {
      if (employeeList[i].Employee_Name === answer.updateRole) {
        employeeSelected = employeeList[i].id
      }
    }
    inquirer.prompt([
      {
        name: "newRole",
        type: "list",
        message: "what is the new role:",
        choices: function() {
          var roleList = [];
          for (var i = 0; i < rolesList.length; i++) {
            roleList.push(rolesList[i].title)
          }
          return roleList;
        }
      }
    ]).then(answer => {
for (i = 0; i < rolesList.length; i++) {
  if (answer.newRole === rolesList[i].title) {
    newChoice = rolesList[i].id
    connection.query(`UPDATE employee SET role_id = ${newChoice} WHERE id = ${employeeSelected}`), (err, res) => {
      if (err) throw err;
    };
  }
}
console.log("Role updated succesfully");
getEmployees();
getRoles();
trackEmployee();
})
})
};


const updateEmployeesManager = () => {
  let employeeList = [];

  for (var i = 0; i < employees.length; i++) {
    employeeList.push(Object(employees[i]));
  }
  inquirer.prompt([
    {
      name: "updateManager",
      type: "list",
      message: "select the employee whose managaer you want to update?",
      choices: function () {
        var roleList = [];
        for (var i = 0; i < employeeList.length; i++) {
          roleList.push(employeeList[i].Employee_Name);
        }
        return roleList;
      }
    }
  ]).then(answer => {
    getEmployees();
    getManagers();
    let managerList = [];
    for (i = 0; i < managers.length; i++) {
      managerList.push(Object(managers[i]));
    };
    for (i = 0; i < employeeList.length; i++) {
      if (employeeList[i].Employee_Name === answer.updateManager) {
        employeeSelected = employeeList[i].id
      }
    }
    inquirer.prompt([
      {
        name: "newManager",
        type: "list",
        message: "Select a new manager:",
        choices: function() {
          var roleList = [];
          for (var i = 0; i < managerList.length; i++) {
            roleList.push(managerList[i].managers)
          }
          return roleList;
        }
      }
    ]).then(answer => {
for (i = 0; i < managerList.length; i++) {
  if (answer.newManager === managerList[i].managers) {
    newChoice = managerList[i].id
    connection.query(`UPDATE employee SET manager_id = ${newChoice} WHERE id = ${employeeSelected}`), (err, res) => {
      if (err) throw err;
    };
    console.log("Manager Updated Succesfully");
  }
}
getEmployees();
getManagers();
trackEmployee();
    })
  })
};

// run delete functions

const deleteDepartments = () => {
  let departmentList = [];
  for (var i = 0; i < departments.length; i++) {
    departmentList.push(Object(departments[i]));
  }

  inquirer.prompt([
    {
      name: "department",
      type: "list",
      message: "What department do you want to delete",
      choices: function() {
        var depChoice = [];
        for (var i = 0; i < departmentList.length; i++) {
          depChoice.push(departmentList[i])
        }
        return depChoice;
      }
    }
  ]).then(answer => {
    for (i = 0; i < departmentList.length; i++) {
      if (answer.department === departmentList[i].name) {
        newChoice = departmentList[i].id
        connection.query(`DELETE FROM department Where id = ${newChoice}`), (err, res) => {
          if (err) throw err;
        };
        console.log("You successfully deleted  " + answer.department + " department");
      }
    }
    getDepartments();
    trackEmployee();
  })
};

// run delete roles
const deleteRoles= () => {
  let roleList = [];
  for (var i = 0; i < roles.length; i++) {
    roleList.push(Object(roles[i]));
  }

  inquirer.prompt([
    {
      name: "role",
      type: "list",
      message: "What role would you want to delete",
      choices: function() {
        var roleChoice = [];
        for (var i = 0; i < roleList.length; i++) {
          roleChoice.push(roleList[i].title)
        }
        return roleChoice;
      }
    }
  ]).then(answer => {
    for (i = 0; i < roleList.length; i++) {
      if (answer.role === roleList[i].title) {
        newChoice = roleList[i].id
        connection.query(`DELETE FROM role Where id = ${newChoice}`), (err, res) => {
          if (err) throw err;
        };
        console.log("You successfully deleted  " + answer.role + "role");
      }
    }
    getRoles();
    trackEmployee();
  })
};

const deleteEmployees = () => {
  let employeeList = [];
  for (var i = 0; i < employees.length; i++) {
    employeeList.push(Object(employees[i]));
  }
  inquirer
    .prompt({
      name: 'employee',
      type: 'list',
      message: 'Which employee would you want to delete?',
      choices: function() {
        var employChoice = [];
        for (var i = 0; i < employeeList.length; i++) {
          employChoice.push(employeeList[i].Employee_Name)
        }
        return employChoice;
      }
    
    }) .then((answer) => {
      for (i = 0; i < employeeList.length; i++) {
        if (answer.employee === employeeList[i].Employee_Name) {
          newChoice = employeeList[i].id
          connection.query(`DELETE FROM employee Where id = ${newChoice}`), (err, res) => {
            if (err) throw err;
          };
          console.log( ("Employee: " + answer.employee + " has been Deleted Succesfully"));
        }
      }
        getEmployees();
        trackEmployee();
      });
};
















