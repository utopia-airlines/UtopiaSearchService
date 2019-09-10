const listLocationSQL = require('./listForSQL')

// Given a field to filter by location code ('destination' or 'departure'),
// produces a function that, given a list of location codes and the database
// connection, produces SQL to filter that field to include only locations in
// the list.
module.exports.locationFilter = (field) => ((locations, db) => {
    if (locations) {
        return ` AND ${field} IN (${listLocationSQL(locations.split(','), db)})`;
    } else {
        return '';
    }
});
