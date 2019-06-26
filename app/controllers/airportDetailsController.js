const airportDetailDao = require('../dao/airportDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('airportDetailController');
const cbFunction = require('./controllerCallBack');

routes.get('/airportDetails', function(req, res) {
    airportDetailDao.get(req.query, function(error, result) {
        cbFunction(error, result, res, logger);
    });
});

routes.get('/airports', (req, res) => {
    airportDetailDao.getAll(function(error, result) {
        cbFunction(error, result, res, logger);
    });
});

module.exports = routes;