const seatDetailDao = require('../dao/seatDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('airportDetailController');
const cbFunction = require('./controllerCallBack');

routes.get('/seats', function(req, res) {
    seatDetailDao.get(req.query, function(error, result) {
        cbFunction(error, result, res, logger);
    });
});

module.exports = routes;