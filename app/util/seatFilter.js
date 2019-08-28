const listLocationSQL = require('./listForSQL');
// pass in the seat name list and the db connection (which includes the escape
// function)
module.exports.seatFilter = (seat, db) => {
    let seatArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the seat object
    if (seat) {
        seatArray = seat.split(',');
        return ` AND seat IN (${listLocationSQL(seatArray, db)})`;
    } else {
        return '';
    }
};