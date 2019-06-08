const searchDao = require('../dao/searchDao');
const routes = require('express').Router();

routes.get('/', function(req, res) {

    searchDao.getAll(req.query, function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send('Sorry, but something happend on our server!');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        }
    });
});

module.exports = routes;