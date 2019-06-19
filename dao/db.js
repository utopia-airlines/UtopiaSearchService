if (process.env.NODE_ENV === 'test') {
    module.exports = require('../config/query.config.test');
} else {
    module.exports = require('../config/query.config.prod');
}