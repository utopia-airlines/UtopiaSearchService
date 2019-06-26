const flightDetailDao = require('../dao/flightDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('flightDetailController');
const cbFunction = require('./controllerCallBack');

routes.get('/flightDetails', function(req, res) {
    flightDetailDao.get(req.query, function(error, result) {
        cbFunction(error, result, res, logger);
    });
});

routes.get('/flights', (req, res) => {
    flightDetailDao.getAll(function(error, result) {
        cbFunction(error, result, res, logger);
    });
});

module.exports = routes;