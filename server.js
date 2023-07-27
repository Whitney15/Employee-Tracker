// Import and require mysql2, inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;



// MySQL connection
const db = mysql.createConnection(
  {
    host: 'localhost', // MySQL username
    user: 'root',
    password: '', // Add MySQL password here
    database: 'employees_db',
 
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
        switch (answer) {
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
                connection.end();
                console.log("Bye!");
              break;
              
            }
    });
};

// function to view all departments
function viewAllDepartments() {
    const query = "SELECT * FROM department"
}