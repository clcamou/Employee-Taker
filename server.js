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
            choices: [
                "find employee", 
                "find all employees", 
                "find deparments", 
                "find salaries", 
                "find roles",
                "view employee manager",
                "add employee", 
                "update employee role",
                "update employee manager",
                "remove employee",
            ]
        })
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
                case "find salaries":
                    salariesSearch();
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
        let query = "SELECT id, first_name, last_name, role_id, manager_id FROM employees WHERE ?";
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
    connection.query("SELECT * department WHERE ?", {id: answer.name}, function(err, res){
        console.log(
            "id: " +
            res[0].name 
        );
        runSearch();
    })
};

function salariesSearch(){
    connection.query("SELECT * FROM role WHERE ?", {salary: answer.salary}, function(err, res){
        console.log(
            "id: " +
            res[0].id +
            "title: "+
            res[0].title +
            " || salary" +
            res[0].salary +
            "department_id: " +
            res[0].department_id
        );
        runSearch();
    })
};
                
                
function rolesSearch(){
    connection.query("SELECT * FROM role WHERE ?", {role_id: answer.role_id}, function(err, res){
        console.log(
            "id: " +
            res[0].id +
            " || title: " +
            res[0].title 
        );
        runSearch();
    });
};

function managerSearch(){
    connection.query("SELECT * FROM employees WHERE ?", {manager: answer.manager_id}, function(err, res){
        console.log(
            "id: " +
            res[0].id +
            " || first_name: " +
            res[0].first_name +
            " || last_name: " +
            res[0].last_name +
            " || role_id: " +
            res[0].role_id +
            " || manager_id : " +
            res[0].manager_id
        );
        runSearch();
    })
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
            
