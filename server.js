const mysql = require("mysql");
const inquirer = require("inquirer");

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
                "find deparments",  
                "find roles",
                "add employee", 
                "update employee role"
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

//pull up a department (in theory)
function departmentSearch(){
    inquirer 
    .prompt({
        name: "find by department", 
        type: "list", 
        message: "What department are you looking for?", 
        choices: ["school", "home"]
    }) 
    .then(function(choices) {
        let query = "SELECT department FROM department WHERE ?";
        connection.query(query, {department: choices.department}, function(err, res){
            for (let i = 0; i < res.length; i++) {
                console.log("find by department: " + res[i].department);
            }
            runSearch();
        });
    });
}
//pull up a list by role
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

