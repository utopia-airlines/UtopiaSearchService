const flightNumberFilter = require('../util/flightNumberFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');

function booleanConvertingWrapper(cb) {
    return function(err, result) {
        if (err) {
            cb(err, result);
            return;
        } 
        for (var record of result) {
            if (record.reserved === 'true') {
                record.reserved = true;
            } else if (record.reserved === 'false') {
                record.reserved = false;
            }
        }
        cb(err, result);
    };
}

exports.get = function(filter, cb) {
    let sqlQuery = 'SELECT seat_row, seat, class, CASE WHEN reserver IS NULL THEN \'false\' ELSE \'true\' END AS reserved FROM tbl_tickets AS t LEFT JOIN tbl_flights AS f ON t.flight = f.id WHERE f.flight_number = ' +
        flightNumberFilter(filter.flight, db) + ';';
    dbConn.query(sqlQuery, booleanConvertingWrapper(cb));
};