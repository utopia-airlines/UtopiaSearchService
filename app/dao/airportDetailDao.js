const airportCodeFilter = require('../util/airportDetailFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');
exports.get = function(filter, cb) {
    let sqlQuery = 'SELECT * FROM tbl_airports WHERE code = ' +
    airportCodeFilter(filter.airport, db) + ';';
    dbConn.query(sqlQuery, cb);
};

exports.getAll = (cb) => {
    let sqlQuery = 'SELECT * FROM tbl_airports;';
    dbConn.query(sqlQuery, cb);
};