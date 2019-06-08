const mysql = require('mysql');
const config = require('../resources/config.json');

const connection = mysql.createConnection(config);

module.exports = connection;