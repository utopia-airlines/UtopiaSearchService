// pass in the flight number and the db connection (which includes the escape
// function)
module.exports = (flightNumber, db) => db.escape(flightNumber);