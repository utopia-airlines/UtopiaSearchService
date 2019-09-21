const allFilters = require('./allFilters');
const dbConn = require('./db');
const db = require('../config/db.config.prod');
const nestAirportsWrapper = require('../util/nestAirportsWrapper');
const nestFlightWrapper = require('../util/nestFlightWrapper');
const seatFields = require('./seatFields');

exports.get = function(filter, cb) {
    // filter out non-NULL reserver by default because we want tickets that
    // have not been taken yet
    let sqlQuery = `SELECT ${seatFields}
                        FROM tbl_tickets AS t
                        LEFT JOIN tbl_flights AS f ON t.flight = f.id
                        LEFT JOIN tbl_airports departure_airport
                            ON f.departure = departure_airport.code
                        LEFT JOIN tbl_airports destination_airport
                            ON f.destination = destination_airport.code
                        WHERE reserver IS NULL
                            ${allFilters.classFilter(filter.class, db)}
                            ${allFilters.seatFilter(filter.seat, db)}
                            ${allFilters.departureDateFilter(filter.departureDateAfter, filter.departureDateBefore, db)}
                            ${allFilters.arrivalDateFilter(filter.arrivalDateAfter, filter.arrivalDateBefore, db)}
                            ${allFilters.departureLocationFilter(filter.departure_location, db)}
                            ${allFilters.destinationLocationFilter(filter.destination_location, db)}
                        ;`;
    dbConn.query(sqlQuery, nestFlightWrapper(nestAirportsWrapper(cb)));
};