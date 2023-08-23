const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
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
      var manager;
      if ((answer.managerId = "")) {
        manager = null;
      }
      db.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: manager,
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
  db.query(
    // department. is being defind on the LEFT JOIN, department_id has to match the department.id.
    "SELECT role.id, role.title, role.salary, department.department_name AS department FROM role LEFT JOIN department ON department_id = department.id",
    function (err, results) {
      console.table(results);
      mainM();
    }
  );
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
      // asls questions by prompting user
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answer) {
      // grab the function and pass in the asnwer to the variable called asnwer
      db.query(
        "INSERT INTO department SET ?", // set name of department
        {
          department_name: answer.departmentName,
        },
        function (err) {
          if (err) throw err;
          console.log("Department added successfully!");
          mainM();
        }
      );
    });
}
