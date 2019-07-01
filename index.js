const searchController = require('./app/controllers/searchController');
const airportDetailsController = require('./app/controllers/airportDetailsController');
const flightDetailsController = require('./app/controllers/flightDetailController');
const seatDetailsController = require('./app/controllers/seatDetailsController');

function createPromise(method) {
    return new Promise(function(resolve, reject) {
        method((err, result) => {
            if (err) {
                console.log(err);
                reject(Error(err));
            } else {
                resolve(result);
            }
        });
    });
}

exports.handler = async (event) => {
    // if there is nothing in querystring, then just pass an empty obj instead of undefined
    const filter = (event && event.params && event.params.querystring) ? event.params.querystring : {};
    const path = event.context["resource-path"];
    switch(path) {
        case '/search':
            return createPromise((cb) => searchController.get(filter, cb));
        case '/airports':
            return createPromise((cb) => airportDetailsController.getAll(cb));
        case '/airportDetails':
            return createPromise((cb) => airportDetailsController.getDetail(filter, cb));
        case '/flights':
            return createPromise((cb) => flightDetailsController.getAll(cb));
        case '/flightDetails':
            return createPromise((cb) => flightDetailsController.getDetail(filter, cb));
        case '/seats':
            return createPromise((cb) => seatDetailsController.getDetail(filter, cb));
        default:
            return null;
    }
};