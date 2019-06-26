// pass in the flight number and the db connection (which includes the escape function)
module.exports = (flightNumber, db) => {
    return db.escape(flightNumber);
};