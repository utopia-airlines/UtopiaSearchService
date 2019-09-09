const searchDao = require('../dao/searchDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('searchController');
const cbFunction = require('./controllerCallBack');
const uncurry = require('../util/uncurry');

routes.get('/', function(req, res) {
    searchDao.get(req.query, uncurry(cbFunction, res, logger));
});

module.exports = routes;