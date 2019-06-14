const searchDao = require('../dao/searchDao');
const routes = require('express').Router();

const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'searchController' },
    transports: [
    //   new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
});

routes.get('/', function(req, res) {

    searchDao.getAll(req.query, function(error, result) {
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