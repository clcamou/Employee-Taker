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
                "find departments",  
                "find roles",
                "add employee", 
                "update employee role", 
                "add department", 
                "add role"
            ]
        }) //use selection to run the function
        .then(function(answer){
            switch (answer.action) {
                case "find all employees":
                    employeesSearch();
                    break;
                case "find departments":
                    departmentSearch();
                    break;
                case "find roles":
                    rolesSearch();
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
            }
        });
}

//pull all employees 
function employeesSearch(){
    let query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
            console.table(res)
        runSearch();
        });
}

//pull up a department (in theory)
function departmentSearch(){
    inquirer 
    .prompt({
        name: "department", 
        type: "input", 
        message: "What department are you looking for?", 
    }) 
    .then(function(answer) {
        let query = "SELECT "
        connection.query("SELECT * FROM department WHERE ?", {department: answer.department}, function(err, res){
            for (let i = 0; i < res.length; i++){
                console.table(res[i]);
            }
            runSearch();
        });
    });
}                                                                                                                                  
//pull up a list by role
function rolesSearch(){
    inquirer 
    .prompt({
        name: "title", 
        type: "input", 
        message: "What role are you looking for?"
    }) 
    .then(function(answer){
        connection.query("SELECT * FROM role WHERE ?", {title: answer.title}, function(err, res){
        for(let i = 0; i < res.length; i++){
        console.table(res[i]);
        }
        runSearch();
    });
});
};        

