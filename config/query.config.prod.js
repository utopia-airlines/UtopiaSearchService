const db = require('../config/db.config.prod');

const query = (sqlQuery, cb) => {
    // filter out reserver by default because we want tickets that have not been taken yet
    db.query(sqlQuery,cb);
};

module.exports.query = query;