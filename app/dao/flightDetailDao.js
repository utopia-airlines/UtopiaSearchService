const flightNumberFilter = require('../util/flight_numberFilter');
const dbConn = require('./db');
const db = require('../config/db.config.prod');
const nestAirportsWrapper = require('../util/nestAirportsWrapper');

const baseQuery = `SELECT departure_airport.code AS departure_code,
                        departure_airport.name AS departure_name,
                        destination_airport.code AS destination_code,
                        destination_airport.name AS destination_name,
                        departure_date, arrival_date, flight_number
                    FROM tbl_flights
                    LEFT JOIN tbl_airports departure_airport
                        ON tbl_flights.departure = departure_airport.code
                    LEFT JOIN tbl_airports destination_airport
                        ON tbl_flights.destination = destination_airport.code`

exports.get = function(filter, cb) {
    let sqlQuery = `${baseQuery}
                        WHERE flight_number = ${flightNumberFilter(filter.flight, db)}
                        ;`;
    dbConn.query(sqlQuery, nestAirportsWrapper(cb));
};

exports.getAll = (cb) => {
    dbConn.query(`${baseQuery};`, nestAirportsWrapper(cb));
};