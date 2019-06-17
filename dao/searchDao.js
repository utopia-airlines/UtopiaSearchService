const db = require('./db');
const allFilters = require('./allFilters');
let sqliteConnection = null;
if (process.env.NODE_ENV === 'test') {
    let sqliteDatabase = require('better-sqlite3');
    sqliteConnection = new sqliteDatabase('airlinesTest.db', {memory: true});
}
exports.getAll = function(filter, cb) {
    let sqlQuery = 'SELECT flight, seat_row, seat, class, reserver, price, reservation_timeout, booking_id, departure, destination, departure_date, arrival_date, flight_number FROM tbl_tickets AS t LEFT JOIN tbl_flights AS f ON t.flight = f.id WHERE reserver IS NULL' +
        allFilters.classFilter(filter.class, db) + allFilters.seatFilter(filter.seat, db) +
        allFilters.departureDateFilter(filter.departureDateAfter, filter.departureDateBefore, db) + allFilters.arrivalDateFilter(filter.arrivalDateAfter, filter.arrivalDateBefore, db) +
        allFilters.departureLocationFilter(filter.departure_location, db) + allFilters.destinationLocationFilter(filter.destination_location, db) + ';';
    if (process.env.NODE_ENV === 'test') {
        const result = sqliteConnection.prepare(sqlQuery).all(); // Please look at the README for debugging to the console
        cb(null, result);
    } else {
        db.query(sqlQuery,cb); // filter out reserver by default because we want tickets that have not been taken yet
    }
};