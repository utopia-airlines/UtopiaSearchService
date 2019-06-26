const airportDetailDao = require('../dao/airportDetailDao');
const routes = require('express').Router();
const logger = require('../util/logger').createLogger('airportDetailController');

routes.get('/airportDetails', function(req, res) {
    airportDetailDao.get(req.query, function(error, result) {
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

routes.get('/airports', (req, res) => {
    airportDetailDao.getAll(function(error, result) {
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