const flightDetailDao = require('../dao/flightDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('flightDetailController');

routes.get('/flightDetails', function(req, res) {
    flightDetailDao.get(req.query, function(error, result) {
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

routes.get('/flights', (req, res) => {
    flightDetailDao.getAll(function(error, result) {
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