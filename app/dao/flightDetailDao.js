const flightNumberFilter = require('../util/flight_numberFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');

function deleteMultiple(obj, ...names) {
    for (var name of names) {
        delete obj[name];
    }
}

function nestAirportsWrapper(cb) {
    return function(err, result) {
        if (err) {
            cb(err, result);
            return;
        }
        for (var record of result) {
            record.departure = {
                code: record.departure_code,
                name: record.departure_name
            };
            record.destination = {
                code: record.destination_code,
                name: record.destination_name
            };
            deleteMultiple(record, 'departure_code', 'departure_name',
                'destination_code', 'destination_name');
        }
        cb(err, result);
    };
}

exports.get = function(filter, cb) {
    let sqlQuery = `SELECT departure_airport.code AS departure_code,
                            departure_airport.name AS departure_name,
                            destination_airport.code AS destination_code,
                            destination_airport.name AS destination_name,
                            departure_date, arrival_date, flight_number
                        FROM tbl_flights
                        LEFT JOIN tbl_airports departure_airport
                            ON tbl_flights.departure = departure_airport.code
                        LEFT JOIN tbl_airports destination_airport
                            ON tbl_flights.destination = destination_airport.code
                        WHERE flight_number = ${flightNumberFilter(filter.flight, db)}
                        ;`;
    dbConn.query(sqlQuery, nestAirportsWrapper(cb));
};

exports.getAll = (cb) => {
    let sqlQuery = `SELECT departure_airport.code AS departure_code,
                        departure_airport.name AS departure_name,
                        destination_airport.code AS destination_code,
                        destination_airport.name AS destination_name,
                        departure_date, arrival_date, flight_number
                        FROM tbl_flights
                        LEFT JOIN tbl_airports departure_airport
                            ON tbl_flights.departure = departure_airport.code
                        LEFT JOIN tbl_airports destination_airport
                            ON tbl_flights.destination = destination_airport.code;`;
    dbConn.query(sqlQuery, nestAirportsWrapper(cb));
};