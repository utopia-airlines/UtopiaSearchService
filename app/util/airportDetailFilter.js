// pass in the airport code and the db connection (which includes the escape function)
module.exports = (airportCode, db) => db.escape(airportCode);