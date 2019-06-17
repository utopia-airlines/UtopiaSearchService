const listLocationSQL = require('./listForSQL');
// pass in the destination location list and the db connection (which includes the escape function)
module.exports.destinationLocationFilter = (destinationLocation, db) => {
    let destinationLocationArray = null;
    // still in string form after getting passed as a query parameter if there is something the destination_location object
    if (destinationLocation) {
        destinationLocationArray = destinationLocation.split(',');
        return ' AND destination IN (' + listLocationSQL(destinationLocationArray, db) + ')';
    } else {
        return '';
    }
};