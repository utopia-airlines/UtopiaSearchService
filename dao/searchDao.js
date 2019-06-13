const db = require('./db');
const sqliteDatabase = require('better-sqlite3');

exports.getAll = function(filter, cb) {
    let classFilter = '';
    if(filter.class) {
        classFilter = ' AND class = ' + db.escape(filter.class);
    }
    let sqlQuery = 'SELECT * FROM tbl_tickets WHERE reserver IS NULL' + classFilter + ';';

    if(process.env.NODE_ENV === 'test') {
        // for debugging add `verbose: console.log` to the object being passed in eg. {verbose: console.log, memory: true} (also look at the README)
        const Testdb = new sqliteDatabase('airlinesTest.db', {memory: true});
        const result = Testdb.prepare(sqlQuery).all();
        // console.log(result);
        cb(null, result);
    } else {
        // filter out reserver by default because we want tickets that have not been taken yet
        db.query(sqlQuery,cb);
    }
};