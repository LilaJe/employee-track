const inquirer = require("inquirer");
const mysql = require("mysq2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_db",
});

mainM();
function mainM() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.menu) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
      }
    });
}
function viewEmployees() {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
    mainM();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role ID?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the employee's manager's ID?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added successfully!");
          mainM();
        }
      );
    });
}

function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "What is the employee's ID?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's new role ID?",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.roleId,
          },
          {
            id: answer.employeeId,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log("Employee role updated successfully!");
          mainM();
        }
      );
    });
}

function viewRoles() {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
    mainM();
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "departmentId",
        message: "What is the department ID for this role?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO role SET ?",
        {
          title: answer.roleName,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        function (err) {
          if (err) throw err;
          console.log("Role added successfully!");
          mainM();
        }
      );
    });
}

function viewDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
    mainM();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO department SET ?",
        {
          name: answer.departmentName,
        },
        function (err) {
          if (err) throw err;
          console.log("Department added successfully!");
          mainM();
        }
      );
    });
}
