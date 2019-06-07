const mysql = require('mysql');
const config = require('../resources/config.json');

const connection = mysql.createConnection({
    host : config.hostname,
    user : config.username,
    password : config.password,
    database : config.database
});

module.exports = connection;