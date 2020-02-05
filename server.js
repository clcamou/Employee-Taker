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
