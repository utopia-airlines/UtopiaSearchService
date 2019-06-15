// pass in the seat name list and the db connection (which includes the escapte function)
module.exports.seatFilter = (seat, db) => {
    // filter to be used on sql query
    let seatFilter = '';
    let seatArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the seat object
    if(seat) {seatArray = seat.split(',');}
    
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
    return seatFilter;
}