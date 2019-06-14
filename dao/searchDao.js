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
    let sqlQuery = 'SELECT * FROM tbl_tickets WHERE reserver IS NULL' + classFilter +
        seatFilter + ';';

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