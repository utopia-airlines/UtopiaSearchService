// pass in the departure after a date (optional) and before a date (optional),
// and the db connection (which includes the escapte function)
module.exports.departureDateFilter = (departureDateAfter, departureDateBefore, db) => {
    let departureDateFilter = '';
    // if the user wants to leave any time after `departureDateAfter`
    departureDateAfter = departureDateAfter ? db.escape(departureDateAfter) : '\'0000-00-00 00:00:00\'';
    
    // if the user wants to leave anytime before `departureDateBefore`
    departureDateBefore = departureDateBefore ? db.escape(departureDateBefore) : '\'9999-12-31 23:59:59\'';

    // create sql query filter
    if(departureDateAfter || departureDateBefore) {
        departureDateFilter = ' AND departure_date BETWEEN ' + departureDateAfter + ' AND ' + departureDateBefore;
    }
    return departureDateFilter;
}