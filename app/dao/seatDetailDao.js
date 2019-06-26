const flightNumberFilter = require('../util/flightNumberFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');

exports.get = function(filter, cb) {
    let sqlQuery = 'SELECT seat_row, seat FROM tbl_tickets AS t LEFT JOIN tbl_flights AS f ON t.flight = f.id WHERE f.flight_number = ' +
    flightNumberFilter(filter.flight, db) + ';';
    dbConn.query(sqlQuery, cb);
};