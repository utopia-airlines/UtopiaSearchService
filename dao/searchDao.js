const db = require('./db');
const classFilterFunction = require('../util/classFilter');
const seatFilterFunction = require('../util/seatFilter');
const departureDateFunction = require('../util/departureDateFilter');
const arrivalDateFunction = require('../util/arrivalDateFilter');
const departureLocationFunction = require('../util/departureLocationFilter');
const destinationLocationFunction = require('../util/destinationLocationFilter');

let sqliteDatabase;
if(process.env.NODE_ENV === 'test') {sqliteDatabase = require('better-sqlite3');}

exports.getAll = function(filter, cb) {
    // get class filter
    const classFilter = classFilterFunction.classFilter(filter.class, db);
    // get seat filter
    const seatFilter = seatFilterFunction.seatFilter(filter.seat, db);
    // get departure date filter
    const departureDateFilter = departureDateFunction.departureDateFilter(filter.departureDateAfter, filter.departureDateBefore, db);
    // get arrival date filter
    const arrivalDateFilter = arrivalDateFunction.arrivalDateFilter(filter.arrivalDateAfter, filter.arrivalDateBefore, db);
    // get departure location filter
    const departureLocationFilter = departureLocationFunction.departureLocationFilter(filter.departure_location, db);
    // get destination location filter
    const destinationLocationFilter = destinationLocationFunction.destinationLocationFilter(filter.destination_location, db);

    let sqlQuery = 'SELECT flight, seat_row, seat, class, reserver, price, reservation_timeout, booking_id, departure, destination, departure_date, arrival_date, flight_number FROM tbl_tickets AS t LEFT JOIN tbl_flights AS f ON t.flight = f.id WHERE reserver IS NULL' + classFilter +
        seatFilter + departureDateFilter + arrivalDateFilter + departureLocationFilter + destinationLocationFilter + ';';

    if(process.env.NODE_ENV === 'test') {
        // Please look at the README for debugging to the console
        const Testdb = new sqliteDatabase('airlinesTest.db', {memory: true});
        const result = Testdb.prepare(sqlQuery).all();
        cb(null, result);
    } else {
        // filter out reserver by default because we want tickets that have not been taken yet
        db.query(sqlQuery,cb);
    }
};