// pass in the arrival date after a certain date (optional) and before a certain date (optional),
// and the db connection (which includes the escape function)
module.exports.arrivalDateFilter = (arrivalDateAfterParam, arrivalDateBeforeParam, db) => {
    // if the user wants to arrive anytime after `arrivalDateAfter`
    let arrivalDateAfter = arrivalDateAfterParam ? db.escape(arrivalDateAfterParam) : '\'0000-00-00 00:00:00\'';

    // if the user wants to arrive anytime before `arrivalDateBefore`
    let arrivalDateBefore = arrivalDateBeforeParam ? db.escape(arrivalDateBeforeParam) : '\'9999-12-31 23:59:59\'';

    if (arrivalDateAfterParam || arrivalDateBeforeParam) {
        return ` AND arrival_date BETWEEN ${arrivalDateAfter} AND ${arrivalDateBefore}`;
    } else {
        return '';
    }
};