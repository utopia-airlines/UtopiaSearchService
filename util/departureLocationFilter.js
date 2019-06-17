const listLocationSQL = require('./listForSQL');
// pass in the departure location list and the db connection (which includes the escape function)
module.exports.departureLocationFilter = (departureLocation, db) => {
    let departureLocationFilter = ''; // filter to be used on sql query
    let departureLocationArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the departure_location object
    if (departureLocation) {
        departureLocationArray = departureLocation.split(',');
        let sqlDepartureLocationList = listLocationSQL(departureLocationArray, db);
        departureLocationFilter = ' AND departure IN (' + sqlDepartureLocationList + ')';
    }
    return departureLocationFilter;
};