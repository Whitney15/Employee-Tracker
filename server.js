// Import and require mysql2, inquirer
require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const PORT = process.env.PORT || 3006;



// MySQL connection
const db = mysql.createConnection(
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

// Connect to employees_db database
db.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employees_db database.`);
// start the application
    start();
});

// Function to start Employee Tracker 
function start() {
    inquirer
    .prompt({
        type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add a employee",
        "Update an employee role",
        "Exit",
        ],
    })
    .then((answer) => {
      console.log(answer);
        switch (answer.action) {
            case "View all departments":
                viewAllDepartments();
              break;

              case "View all roles":
                viewAllRoles();
              break;

              case "View all employees":
                viewAllEmployees();
              break;
              
              case "Add a department":
                addDepartment();
              break;

              case "Add a role":
                addRole();
              break;

              case "Add a employee":
                addEmployees();
              break;

              case "Update an employee role":
                updateEmployeeRole();
              break;

              case "Exit":
                process.end();
                console.log("Bye!");
              break;
              
            }
    });
};

// function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM department";
    db.query(query, function(err, res) {
      console.log("njcnskj");
        if (err) throw err;
        console.log(res);
        start();
    });
}

// function to view all roles
function viewAllRoles() {
    const query = "SELECT * FROM role";
    db.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
}

// function to view all employees
function viewAllEmployees() {
    const query = "SELECT * FROM employee";
    db.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        start();
    });
}

// function to add a department
function addDepartment() {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "What is the name of the department?"
        }
    ])
    .then(function(res) {
        const query = `INSERT INTO department (department_name) VALUES ("${answer.name}")`;
        db.query(query, res.department, function(err, data) {
            if (err) throw err;
            console.log(`${answer.name} Department added successfully!`);
            start();
            console.log(answer.name)
        });
    });
}

// function to add a role
function addRole() {
   const query = "SELECT * FROM department";
   db.query(query, function(err, res) { 
    if (err) throw err;
    inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role title?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is role salary?"
        },
        {
            type: "list",
            name: "department",
            message: "Select the department of the new role:",
            choices: res.map(
                (department) => department.department_name
            ),
        },
    ])
        .then(function (answer) {
            var query = `INSERT INTO role SET ?`

        db.query(query, {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        },
        function (err, res) {
            if (err) throw err;

            console.table(res);
            console.log("New role inserted!");

            firstPrompt();
        });
    });
});
}


// function to add a employee
function addEmployees() {
   db.query(query, function (err, res) {
        if (err) throw err;

        const roles = res.map(({ id, title, salary }) => ({
            value: id, 
            title: `${title}`, 
            salary: `${salary}`
          }));
         
          console.table(res);
        promptInsert(roles);
        });
        
// function to add a employee
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?"
        },
        {
          type: "list",
          name: "roleId",
          message: "What is the employee's role?",
          choices: roleChoices
        },
      ])
      .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`
        // when finished prompting, insert a new item into the db with that info
        db.query(query,
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Employee added!");
  
            start();
          });
      });
}


 

// function to update an employee role
function updateEmployeeRole() {
    employeeArray();

}

function employeeArray() {
  console.log("Updating an employee");

  var queryEmployee =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`

  db.query(queryEmployee, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id, name: `${first_name} ${last_name}`      
    }));

    console.table(res);

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Updating an role");

  var query =
    `SELECT r.id, r.title, r.salary 
  FROM role r`
  let roleChoices;

 db.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`      
    }));

    console.table(res);

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices
      },
      {
        type: "list",
        name: "role_id",
        message: "Which role do you want to update?",
        choices: roleChoices
      },
    ])
    .then(function (answer) {

      var query = `UPDATE employee SET role_id = ? WHERE id = ?`
      // when finished prompting, insert a new item into the db with that info
      db.query(query,
        [ answer.roleId,  
          answer.employeeId
        ],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          firstPrompt();
        });
    });
}

// start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });