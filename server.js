const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
//create connection with mysql
const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "Greenapples_45", 
    database: "employerTrackerDB"
});

//use the database to get information 
connection.connect(function(err){
    if (err) throw err; 
    runSearch();
});

//prompt user to select action 
function runSearch() {
    inquirer
        .prompt({ 
            name: "action", 
            type: "rawlist", 
            message: "What would you like to do?", 
            //choices to pick once prompted
            choices: [
                "find all employees", 
                "find by departments",  
                "find by roles",
                "find by manager",
                "add employee", 
                "update employee role", 
                "update manager",
                "add department", 
                "add role",
                "delete",
            ]
        }) //use selection to run the function
        .then(function(answer){
            switch (answer.action) {
                case "find all employees":
                    employeesSearch();
                    break;
                case "find by departments":
                    departmentSearch();
                    break;
                case "find by roles":
                    rolesSearch();
                    break;
                case "find by manager":
                    managerSearch();
                    break;
                case "add employee":
                    addEmployee();
                    break;
                case "update employee role":
                    updateEmployeeRole();
                    break;
                case "add department":
                    addDepartment();
                    break;
                case "add role":
                    addRole();
                    break;
                case "update manager":
                    updateManager();
                    break;
                case "delete":
                    deleteData();
                    break;
                
            }
        });
}

//pull all employees 
function employeesSearch(){
    connection.query("SELECT * FROM employees", function(err, res) {
            console.table(res)
        runSearch();
        });
};

//pull up employees by department 
function departmentSearch(){
    inquirer 
    .prompt({
        name: "department_division", 
        type: "input", 
        message: "What department are you looking for?", 
    }) 
    .then(function(answer) {
        connection.query("SELECT department_division, last_name, first_name FROM department JOIN employees ON department.id = employees.department_id WHERE department.department_division = ?", [answer.department_division, answer.last_name, answer.first_name], function(err, res){
            for (let i = 0; i < res.length; i++){
                console.table(res[i]);
            }
            runSearch();
        });
    });
};                                                                                                               //pull up employees by thier role 
function rolesSearch(){
    inquirer 
    .prompt({
        name: "title", 
        type: "input", 
        message: "What role are you looking for?", 
    }) 
    .then(function(answer) {
        connection.query("SELECT title, last_name, first_name FROM role JOIN employees ON role.id = employees.role_id WHERE role.title = ?", [answer.title, answer.last_name, answer.first_name], function(err, res){
            for (let i = 0; i < res.length; i++){
                console.table(res[i]);
            }
            runSearch();
        });
    });
};   

//pull up employees by their manager
function managerSearch(){
    inquirer 
    .prompt({
        name: "manager_id", 
        type: "input", 
        message: "Which manager are you looking for?", 
    }) 
    .then(function(answer) {
        connection.query("SELECT manager_id, last_name, first_name FROM employees WHERE employees.manager_id = ?", [answer.manager_id, answer.last_name, answer.first_name], function(err, res){
            for (let i = 0; i < res.length; i++){
                console.table(res[i]);
            }
            runSearch();
        });
    });
}; 

//add a department
function addDepartment(){
    inquirer
    .prompt([{
        type: "input", 
        name: "id", 
        message: "Please enter in a new  department id"
    }, 
    {
        type: "input", 
        name: "department_division", 
        message: "Please name the new division"
    }])
    .then(function(answer) {
        connection.query("INSERT INTO department VALUES(?, ?)" ,[answer.id, answer.department_division], console.table("You have added the new id" + answer.id + "for the new department " + answer.department_division),
            runSearch()
        )});
};

//add new employee
function addEmployee(){
    inquirer
    .prompt([{
        name: "id",
        type: "input", 
        message: "Please give an id to the employee", 
    },{
        name: "first_name", 
        type: "input", 
        message: "What is the new employee's first name?"
    },{
        name: "last_name", 
        type: "input", 
        message: "What is the new employee's last name?"
    }, {
        name: "role_id", 
        type: "input", 
        message: "What is their title"
    },{
        name: "manager_id", 
        type: "input", 
        message: "Who is their manager", 
    },{
        name: "department_id", 
        type: "input",
        message: "What department do they belong to?"
    }])
    .then(function(answer) {
        connection.query("INSERT INTO employees VALUES(?, ?, ?, ?, ?, ?)" ,[answer.id, answer.first_name, answer.last_name, answer.role_id, answer.manager_id, answer.department_id], console.table("You have added " + answer.id  + answer.first_name + answer.last_name + answer.role_id + answer.manager_id + answer.department_id + " to employees"),
            runSearch()
    )});
};

function addRole(){
    inquirer
    .prompt([{
        name: "id",
        type: "input", 
        message: "What role id is it?", 

    },{
        name: "title", 
        type: "input", 
        message: "What title is it?"
    },{
        name: "salary",
        type: "input", 
        message: "What salary does this role make?" 
    },{
        name: "department_id", 
        type: "input", 
        message: "What department is it in?"
    }]).then(function(answer) {
        connection.query("INSERT INTO role VALUES(?, ?, ?, ?)" ,[answer.id, answer.title, answer.salary, answer.department_id], console.table("You have added " + answer.id + answer.title + answer.salary + answer.department_id), 
            runSearch()
    )});
};

function updateEmployeeRole(){
    inquirer
    .prompt([{
            name: "id", 
            type: "input", 
            message: "What is the employee's id?"
        },{
            name: "role_id", 
            type: "input", 
            message: "What is their new role?"
    }])
    .then(function(answer) {
        connection.query("UPDATE employees SET role_id = ? WHERE id = ?" , [answer.id, answer.role_id], console.table("You have updaded " + answer.id + "to" + answer.role_id),
            runSearch()
    )});
};

//update manager 
function updateManager(){
    inquirer
    .prompt([{
            name: "id", 
            type: "input", 
            message: "What is the employee's id?"
        },{
            name: "manager_id", 
            type: "input", 
            message: "Who is their new manager (use manager id)?"
    }])
    .then(function(answer) {
        connection.query("UPDATE employees SET id = ? WHERE manager_id = ?" ,[answer.id, answer.manager_id], console.table("You have updated " + answer.id + "to" + answer.manager_id), 
            runSearch()
    )});
};

function deleteData(){
    inquirer
    .prompt({
        name: "delete", 
        type: "rawlist", 
        message: "What do you want to delete?",
        choices: ["employee", "role", "department"]
    })
    .then(function(answer){
        switch(answer.delete) {
            case "employee":
                deleteEmployee();
                break;
            case "department":
                deleteDepartment();
                break;
            case "role":
                deleteRole();
                break;
        }});
};

function deleteEmployee(){
    inquirer
    .prompt({
        name: "id", 
        type: "input", 
        message: "Please use employee id to delete employee from database"
    })
    .then(function(answer){
        connection.query("DELETE FROM employees WHERE id = ?", [answer.id], console.table("You have deleted employee " + answer.id), 
        deleteData()
    )});
};

function deleteDepartment(){
    inquirer
    .prompt({
        name: "id", 
        type: "input", 
        message: "Please use department id to delete the department"
    })
    .then(function(answer){
        connection.query("DELETE FROM department WHERE id = ?", [answer.id], console.table("Deleted department " + answer.id), deleteData()
    )});
};

function deleteRole(){
    inquirer
    .prompt({
        name: "id", 
        type: "input", 
        message: "Please use role id to delete role"
    })
    .then(function(answer){
        connection.query("DELETE FROM role WHERE id = ?", [answer.id], console.table("Deleted role " + answer.id), runSearch())
    });
};
