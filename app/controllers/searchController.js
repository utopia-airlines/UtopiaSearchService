const searchDao = require('../dao/searchDao');
const routes = require('express').Router();
const logger = require('../util/controllerLogger').createLogger;

routes.get('/', function(req, res) {

    searchDao.get(req.query, function(error, result) {
        if (error) {
            logger.error(error);
            console.log(error);
            res.status(500).send('Sorry, but something happend on our server!');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
            logger.info('Succesfully sent', result);
        }
    });
});

module.exports = routes;