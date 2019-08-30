const deleteMultiple = require('./deleteMultiple');

// Make sure that nestAirportsWrapper has gone over the result before it is
// passed to this one.
module.exports = (cb) => function(err, result) {
    if (err) {
        cb(err, result);
        return;
    }
    for (var record of result) {
        record.flight = {
            number: record.flight_number,
            departure: record.departure,
            destination: record.destination,
            departureDate: record.departure_date,
            arrivalDate: record.arrival_date
        };
        deleteMultiple(record, 'flight_number', 'departure', 'destination',
            'departure_date', 'arrival_date');
    }
    cb(err, result);
};
