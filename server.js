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
    promptuser();
});

function promptuser() {
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
            }
        })
};

