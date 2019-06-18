const allFilters = require('./allFilters');
const dbConn = require('./db');
const db = require('../config/db.config.prod');
exports.get = function(filter, cb) {
    let sqlQuery = 'SELECT flight, seat_row, seat, class, reserver, price, reservation_timeout, booking_id, departure, destination, departure_date, arrival_date, flight_number FROM tbl_tickets AS t LEFT JOIN tbl_flights AS f ON t.flight = f.id WHERE reserver IS NULL' +
        allFilters.classFilter(filter.class, db) + allFilters.seatFilter(filter.seat, db) +
        allFilters.departureDateFilter(filter.departureDateAfter, filter.departureDateBefore, db) + allFilters.arrivalDateFilter(filter.arrivalDateAfter, filter.arrivalDateBefore, db) +
        allFilters.departureLocationFilter(filter.departure_location, db) + allFilters.destinationLocationFilter(filter.destination_location, db) + ';';
        dbConn.query(sqlQuery, cb);
};