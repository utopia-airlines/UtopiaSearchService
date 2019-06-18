const db = require('../config/db.config.test');

const query = (sqlQuery, cb) => {
    try {
        const result = db.prepare(sqlQuery).all();
        cb(null, result);
    } catch (error) {
        cb(error, null);
    }
};

module.exports.query = query;