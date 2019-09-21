const flightNumberFilter = require('../util/flightNumberFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');
const nestAirportsWrapper = require('../util/nestAirportsWrapper');
const nestFlightWrapper = require('../util/nestFlightWrapper');
const seatFields = require('./seatFields');

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
    let sqlQuery = `SELECT ${seatFields},
                        CASE WHEN reserver IS NULL THEN 'false' ELSE 'true' END
                            AS reserved
                        FROM tbl_tickets AS t
                        LEFT JOIN tbl_flights AS f ON t.flight = f.id
                        LEFT JOIN tbl_airports departure_airport
                            ON f.departure = departure_airport.code
                        LEFT JOIN tbl_airports destination_airport
                            ON f.destination = destination_airport.code
                        WHERE f.flight_number = ${flightNumberFilter(filter.flight, db)}
                        ;`;
    dbConn.query(sqlQuery, nestFlightWrapper(nestAirportsWrapper(booleanConvertingWrapper(cb))));
};