const listLocationSQL = require('./listForSQL');
// pass in the seat name list and the db connection (which includes the escapte function)
module.exports.seatFilter = (seat, db) => {
    let seatFilter = ''; // filter to be used on sql query
    let seatArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the seat object
    if(seat) {seatArray = seat.split(',');}
    
    if(Array.isArray(seatArray)) {
        const sqlSeatList = listLocationSQL(seatArray, db);
        seatFilter = ' AND seat IN (' + sqlSeatList + ')';
    }
    return seatFilter;
};