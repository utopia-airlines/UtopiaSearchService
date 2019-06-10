const db = require('./db');

exports.getAll = function(filter, cb) {
    let classFilter = '';
    if(filter.class) {
        classFilter = ' AND class = ' + db.escape(filter.class);
    }
    let sqlQuery = 'SELECT * FROM tbl_tickets WHERE reserver IS NULL' + classFilter + ';';
    // filter out reserver by default because we want tickets that have not been taken yet
    db.query(sqlQuery,cb);
};