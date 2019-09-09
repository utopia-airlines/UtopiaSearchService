const seatDetailDao = require('../dao/seatDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('airportDetailController');
const cbFunction = require('./controllerCallBack');
const uncurry = require('../util/uncurry');

routes.get('/seats', function(req, res) {
    seatDetailDao.get(req.query, uncurry(cbFunction, res, logger));
});

module.exports = routes;