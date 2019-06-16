const listLocationSQL = require('./listLocationsForSQL');
// pass in the destination location list and the db connection (which includes the escapte function)
module.exports.destinationLocationFilter = (destinationLocation, db) => {
    let destinationLocationFilter = ''; // filter to be used on sql query
    let destinationLocationArray = null;
    if(destinationLocation) {destinationLocationArray = destinationLocation.split(',');} // still in string form after getting passed as a query parameter if there is something the destination_location object
    if(Array.isArray(destinationLocationArray)) {
        let sqlDestinationLocationList = listLocationSQL(destinationLocationArray, db);
        destinationLocationFilter = ' AND destination IN (' + sqlDestinationLocationList + ')';
    }
    return destinationLocationFilter;
};