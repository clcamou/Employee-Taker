const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");

//create connection with mysql
let connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "Greenapples_45", 
    database: "employerTrackerDB"
});

//use the database to get information 
connection.connect(function(err){
    if (err) {
    console.log(`error connecting: ${err.stack}`);
    return; 
    } 
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
                "find employee", 
                "find all employees", 
                "find deparments",  
                "find roles",
                "view employee manager",
                "add employee", 
                "update employee role",
                "update employee manager",
                "remove employee",
            ]
        }) //use selection to run the function
        .then(function(answer){
            switch (answer.action) {
                case "find employee":
                    employeeSearch();
                    break;
                case "find all employees":
                    employeesSearch();
                    break;
                case "find deparments":
                    departmentSearch();
                    break;

                case "find roles":
                    rolesSearch();
                    break;
                case "view employee manager":
                    managerSearch();
                case "add employee":
                    addEmployee();
                    break;
                case "update employee role":
                    updateEmployeeRole();
                    break;
                case "update employee manager":
                    updateEmployeeManager();
                    break;
                case "remove employee":
                    removeEmployee();
                    break;
            }
        });
}

//find a single employee
function employeeSearch() {
    inquirer 
    .prompt({
        name: "Employee", 
        type: "input",
        message: "Please enter the last name of the employee you are looking you"
    })
    .then(function(answer) {
        let query = "SELECT * FROM employees WHERE ?";
        connection.query(query, {last_name: answer.last_name}, function(err, res){
            for (let i = 0; i < res.length; i++){
                console.log("id: " + res[i].id +
                " || first_name: " + res[i].first_name +
                " || last_name: " + res[i].last_name +
                " || role_id: " + res[i].role_id +
                "|| manager_id " + res[i].manager_id);
            }
            runSearch();
        });
    });
}

function employeesSearch(){
    let query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
        for (let i = 0; i < res.length; i++){
            console.log("id: " + res[i].id +
            " || first_name: " + res[i].first_name +
            " || last_name: " + res[i].last_name +
            " || role_id: " + res[i].role_id +
            "|| manager_id " + res[i].manager_id);
        }
        runSearch();
        });
}


function departmentSearch(){
    inquirer 
    .prompt({
        name: "Department", 
        type: "input", 
        message: "What department are you looking for?"
    }) 
    .then(function(answer){
    let query = "SELECT name FROM department WHERE ?";
    connection.query(query,  {id: answer.name},function(err, res){
        for (let i=0; i < res.length; i++) {
        console.log(
            "Department: " +
            res[i].name);
        }
        runSearch();
    });
});
};
          
function rolesSearch(){
    inquirer 
    .prompt({
        name: "Role", 
        type: "input", 
        message: "What role are you looking for?"
    }) 
    .then(function(answer){
    let query = "SELECT title FROM role WHERE ?";
    connection.query(query,  {id: answer.title},function(err, res){
        for (let i=0; i < res.length; i++) {
        console.log(
            "id: " +
            res[i].id +
            "title: " +
            res[i].title +
            "department_id: " +
            res[i].department_id);
        }
        runSearch();
    });
});
};        

function managerSearch(){
    inquirer 
    .prompt({
        name: "manager", 
        type: "input", 
        message: "What manager are you looking for?"
    }) 
    .then(function(answer){
    let query = "SELECT manager_id FROM employees WHERE ?";
    connection.query(query,  {manager_id: answer.manager_id},function(err, res){
        for (let i=0; i < res.length; i++) {
        console.log(
            "id: " +
            res[i].id +
            "manager: " +
            res[i].manager_id);
        }
        runSearch();
    });
});
};        

function addEmployee(){
    connection.query("INSERT INTO employees", function(err, res){
        inquirer.prompt([
            {
                type:"input", 
                message: "What is the employee's first name?",
                name: "first_name"
            }, 
            {
                type:"input",
                message: "What is the employee's last name?",
                name: "last_name"
            },
            {
                type: "input", 
                message: "What is the employee's role id? ",
                name: "role_id"
            }, 
            {
                type: "input", 
                message: "What is the manager's id?", 
                name: "manager_id"
            }
        ]).then(function(response){
            console.log(response)
        });
    });
};

              
//function updateEmployee(){
    //connection.query("UPDATE employees WHERE ?", {last_name: answer.last_name}, function(err, res){
        
    //})
//};

//function updateEmployeeManager(){
  //  connection.query("UPDATE employees WHERE ?", {last_name: answer.last_name}, function(err, res){
        
    //})
//};

//function RemoveEmployee(){
//   connection.query("DELETE FROM employee WHERE ?", {last_name: answer.last_name}, function(err, res){}) };
            
