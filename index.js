const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./app/controllers/searchController'));

app.use(require('./app/controllers/airportDetailsController'));

app.use(require('./app/controllers/flightDetailController'));

app.use(require('./app/controllers/seatDetailsController'));

let server = app.listen(8080);
console.log('Server running in port: 8080 ...');

module.exports = server;
module.exports.stop = (done) => {
    server.close();
    done();
};