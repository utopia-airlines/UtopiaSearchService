const flightNumberFilter = require('../util/flight_numberFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');
exports.get = function(filter, cb) {
    let sqlQuery = 'SELECT departure, destination, departure_date, arrival_date, flight_number FROM tbl_flights WHERE flight_number = ' +
    flightNumberFilter(filter.flight, db) + ';';
    dbConn.query(sqlQuery, cb);
};

exports.getAll = (cb) => {
    let sqlQuery = 'SELECT departure, destination, departure_date, arrival_date, flight_number FROM tbl_flights;';
    dbConn.query(sqlQuery, cb);
};