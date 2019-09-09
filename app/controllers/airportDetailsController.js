const airportDetailDao = require('../dao/airportDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('airportDetailController');
const cbFunction = require('./controllerCallBack');
const uncurry = require('../util/uncurry');

routes.get('/airportDetails', function(req, res) {
    airportDetailDao.get(req.query, uncurry(cbFunction, res, logger));
});

routes.get('/airports', (req, res) => {
    airportDetailDao.getAll(uncurry(cbFunction, res, logger));
});

module.exports = routes;