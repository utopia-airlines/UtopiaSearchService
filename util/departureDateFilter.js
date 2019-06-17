// pass in the departure after a date (optional) and before a date (optional),
// and the db connection (which includes the escape function)
module.exports.departureDateFilter = (departureDateAfterParam, departureDateBeforeParam, db) => {
    // if the user wants to leave any time after `departureDateAfter`
    let departureDateAfter = departureDateAfterParam ? db.escape(departureDateAfterParam) : '\'0000-00-00 00:00:00\'';
    
    // if the user wants to leave anytime before `departureDateBefore`
    let departureDateBefore = departureDateBeforeParam ? db.escape(departureDateBeforeParam) : '\'9999-12-31 23:59:59\'';

    // create sql query filter
    if (departureDateAfterParam || departureDateBeforeParam) {
        return ' AND departure_date BETWEEN ' + departureDateAfter + ' AND ' + departureDateBefore;
    } else {
        return '';
    }
};