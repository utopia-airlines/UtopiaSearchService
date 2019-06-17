const listLocationSQL = require('./listForSQL');
// pass in the departure location list and the db connection (which includes the escape function)
module.exports.departureLocationFilter = (departureLocation, db) => {
    let departureLocationArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the departure_location object
    if (departureLocation) {
        departureLocationArray = departureLocation.split(',');
        return ' AND departure IN (' + listLocationSQL(departureLocationArray, db) + ')';
    } else {
        return '';
    }
};