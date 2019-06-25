const searchDao = require('../dao/searchDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('searchController');
const cbFunction = require('./controllerCallBack');

routes.get('/', function(req, res) {

    searchDao.get(req.query, function(error, result) {
        cbFunction(error, result, res, logger);
    });
});

module.exports = routes;