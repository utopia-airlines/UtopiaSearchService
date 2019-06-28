const flightDetailDao = require('../dao/flightDetailDao');

module.exports.getDetail = flightDetailDao.get;
module.exports.getAll = flightDetailDao.getAll;