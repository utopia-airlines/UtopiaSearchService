const searchDao = require('../dao/searchDao');
const routes = require('express').Router();

routes.get('/', function(req, res) {
    searchDao.getAll(function(error, result) {
        if(error) res.status(500).send("Sorry, but something happend on our server!");
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    });
});

module.exports = routes;