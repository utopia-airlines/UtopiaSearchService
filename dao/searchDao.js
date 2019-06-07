const db = require('./db');

exports.getAll = function(cb) {
    // filter out reserver because we want tickets that have not been taken yet
    db.query('SELECT * FROM tbl_tickets WHERE reserver IS NULL;', function(err, result) {
        cb(err, result);
    });
};