const db = require('./db');
let sqliteDatabase;
if(process.env.NODE_ENV === 'test') {sqliteDatabase = require('better-sqlite3');}

exports.getAll = function(filter, cb) {
    let classFilter = '';
    if(filter.class) {
        classFilter = ' AND class = ' + db.escape(filter.class);
    }

    // filter to be used on sql query
    let seatFilter = '';
    let seatArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the seat object
    if(filter.seat) {seatArray = filter.seat.split(',');}

    if(Array.isArray(seatArray)) {
        let i;
        let seatLength = seatArray.length;
        let sqlSeatList = '';
        for (i = 0; i < seatLength; i++) {
            let comma = ',';
            // last element will not have a comma after it
            if(i === seatLength - 1) {comma = '';}
            sqlSeatList = sqlSeatList + db.escape(seatArray[i]) + comma;
        }
        seatFilter = ' AND seat IN (' + sqlSeatList + ')';
    }

    let departureDateFilter = '';
    let departureDateAfter = '\'0000-00-00 00:00:00\'';
    let departureDateBefore = '\'9999-12-31 23:59:59\'';
    if(filter.departureDateAfter) {
        departureDateAfter = db.escape(filter.departureDateAfter);
    }

    if(filter.departureDateBefore) {
        departureDateBefore = db.escape(filter.departureDateBefore);
    }

    if(filter.departureDateAfter || filter.departureDateBefore) {
        departureDateFilter = ' AND departure_date BETWEEN ' + departureDateAfter +
        ' AND ' + departureDateBefore;
    }

    let arrivalDateFilter = '';
    let arrivalDateAfter = '\'0000-00-00 00:00:00\'';
    let arrivalDateBefore = '\'9999-12-31 23:59:59\'';
    if(filter.arrivalDateAfter) {
        arrivalDateAfter = db.escape(filter.arrivalDateAfter);
    }

    if(filter.arrivalDateBefore) {
        arrivalDateBefore = db.escape(filter.arrivalDateBefore);
    }

    if(filter.arrivalDateAfter || filter.arrivalDateBefore) {
        arrivalDateFilter = ' AND arrival_date BETWEEN ' + arrivalDateAfter +
        ' AND ' + arrivalDateBefore;
    }

    // filter to be used on sql query
    let departureLocationFilter = '';
    let departureLocationArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the departure_location object
    if(filter.departure_location) {departureLocationArray = filter.departure_location.split(',');}

    if(Array.isArray(departureLocationArray)) {
        let i;
        let departureLocationLength = departureLocationArray.length;
        let sqldepartureLocationList = '';
        for (i = 0; i < departureLocationLength; i++) {
            let comma = ',';
            // last element will not have a comma after it
            if(i === departureLocationLength - 1) {comma = '';}
            sqldepartureLocationList = sqldepartureLocationList + db.escape(departureLocationArray[i]) + comma;
        }
        departureLocationFilter = ' AND departure IN (' + sqldepartureLocationList + ')';
    }

    let sqlQuery = 'SELECT flight, seat_row, seat, class, reserver, price, reservation_timeout, booking_id, departure, destination, departure_date, arrival_date, flight_number FROM tbl_tickets AS t LEFT JOIN tbl_flights AS f ON t.flight = f.id WHERE reserver IS NULL' + classFilter +
        seatFilter + departureDateFilter + arrivalDateFilter + departureLocationFilter + ';';

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