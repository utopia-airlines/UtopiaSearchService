const flightDetailDao = require('../dao/flightDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('flightDetailController');
const cbFunction = require('./controllerCallBack');
const uncurry = require('../util/uncurry');

routes.get('/flightDetails', function(req, res) {
    flightDetailDao.get(req.query, uncurry(cbFunction, res, logger));
});

routes.get('/flights', (req, res) => {
    flightDetailDao.getAll(uncurry(cbFunction, res, logger));
});

module.exports = routes;