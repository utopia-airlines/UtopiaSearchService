const listLocationSQL = require('./listForSQL');
// pass in the destination location list and the db connection (which includes the escapte function)
module.exports.destinationLocationFilter = (destinationLocation, db) => {
    let destinationLocationFilter = ''; // filter to be used on sql query
    let destinationLocationArray = null;
    // still in string form after getting passed as a query parameter if there is something the destination_location object
    if(destinationLocation) {
        destinationLocationArray = destinationLocation.split(',');
        let sqlDestinationLocationList = listLocationSQL(destinationLocationArray, db);
        destinationLocationFilter = ' AND destination IN (' + sqlDestinationLocationList + ')';
    }
    return destinationLocationFilter;
};