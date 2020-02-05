let express = require("express");
let mysql = require("mysql");

//create connection with mysql
let connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "Greenapples_45", 
    database: "employeeTrackerDB"
});

connection.connect(function(err){
    if(err) throw err; 
    runSearch();
});