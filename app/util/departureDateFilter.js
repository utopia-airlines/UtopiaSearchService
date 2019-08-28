// pass in the departure after a date (optional) and before a date (optional),
// and the db connection (which includes the escape function)
module.exports.departureDateFilter = (departingAfterParam, departingBeforeParam, db) => {
    // if the user wants to leave any time after `departingAfter`
    let departingAfter = departingAfterParam ? db.escape(departingAfterParam) : '\'0000-00-00 00:00:00\'';
    
    // if the user wants to leave anytime before `departingBefore`
    let departingBefore = departingBeforeParam ? db.escape(departingBeforeParam) : '\'9999-12-31 23:59:59\'';

    // create sql query filter
    if (departingAfterParam || departingBeforeParam) {
        return ' AND departure_date BETWEEN ' + departingAfter + ' AND ' + departingBefore;
    } else {
        return '';
    }
};
