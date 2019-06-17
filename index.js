const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./controllers/searchController'));

let server = app.listen(8080);
console.log('Server running in port: 8080 ...');

module.exports = server;
module.exports.stop = async (done) => {
    await server.close();
    done();
};