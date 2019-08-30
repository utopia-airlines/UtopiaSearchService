const deleteMultiple = require('./deleteMultiple');

module.exports = (cb) => function(err, result) {
    if (err) {
        cb(err, result);
        return;
    }
    for (var record of result) {
        record.departure = {
            code: record.departure_code,
            name: record.departure_name
        };
        record.destination = {
            code: record.destination_code,
            name: record.destination_name
        };
        deleteMultiple(record, 'departure_code', 'departure_name',
            'destination_code', 'destination_name');
    }
    cb(err, result);
};
