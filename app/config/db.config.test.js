const sqliteDatabase = require('better-sqlite3');

// Please look at the README for debugging to the console
module.exports = new sqliteDatabase('airlinesTest.db', {memory: true});