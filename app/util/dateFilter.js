// Takes the DB connection, the name of a field in the database table being
// queried, and (optionally) date strings defining (an) endpoint(s) of an
// interval. If either endpoint is provided, this returns a SQL fragment
// filtering that field to dates/timestamps within the interval (a missing
// endpoint is replaced with the earliest or latest date and time possible in
// the format SQL expects, depending on which end is omitted); if both are
// omitted, the empty string is returned.
module.exports.dateFilter = (field) => ((afterParam, beforeParam, db) => {
    const after = afterParam ? db.escape(afterParam) : "'0000-00-00 00:00:00'";
    const before = beforeParam ? db.escape(beforeParam) : "'9999-12-31 23:59:59'";

    if (afterParam || beforeParam) {
        return ` AND ${field} BETWEEN ${after} AND ${before}`;
    } else {
        return '';
    }
});
