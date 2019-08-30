const deleteMultiple = require('./deleteMultiple');

function helper(obj, key) {
    obj[key] = {
        code: obj[key + '_code'],
        name: obj[key + '_name']
    };
    deleteMultiple(obj, key + '_code', key + '_name');
}

module.exports = (cb) => function(err, result) {
    if (err) {
        cb(err, result);
        return;
    }
    for (var record of result) {
        helper(record, 'departure');
        helper(record, 'destination');
    }
    cb(err, result);
};
