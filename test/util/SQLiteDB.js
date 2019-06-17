// used for testing
const sqliteDatabase = require('better-sqlite3');
const readline = require('readline');
const fs = require('fs');

module.exports.createSQLiteDatabase = function(cb) {
    // Please look at the README for debugging to the console
    const Testdb = new sqliteDatabase('airlinesTest.db', {memory: true});
    // creates a stream to listen to using a given file
    const readInterface = readline.createInterface({
        input: fs.createReadStream('test/resources/SQLiteDB.sql'),
    });
    // for each line, run that line's sql command
    readInterface.on('line', function(line) {
        Testdb.prepare(line).run();
    });

    // call the callback function
    cb();
};