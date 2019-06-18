const db = (process.env.NODE_ENV === 'test') ? require('../config/query.config.test') : require('../config/query.config.prod');

module.exports = db;