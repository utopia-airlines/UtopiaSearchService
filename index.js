const searchController = require('./app/controllers/searchController');
const airportDetailsController = require('./app/controllers/airportDetailsController');
const flightDetailsController = require('./app/controllers/flightDetailController');
const seatDetailsController = require('./app/controllers/seatDetailsController');

exports.handler = async (event) => {
    // if there is nothing in querystring, then just pass an empty obj instead of undefined
    const filter = (event && event.params && event.params.querystring) ? event.params.querystring : {};
    const path = event.context["resource-path"];
    if (path === '/search') {
        return new Promise(function(resolve, reject) {
            searchController.get(filter, (err,result) => {
                if(err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    resolve(result);
                }
            });
      });
    } else if (path === '/airports') {
        return new Promise(function(resolve, reject) {
            airportDetailsController.getAll((err,result) => {
                if(err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    } else if (path === '/airportDetails') {
        return new Promise(function(resolve, reject) {
            airportDetailsController.getDetail(filter, (err,result) => {
                if(err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    } else if (path === '/flights') {
        return new Promise(function(resolve, reject) {
            flightDetailsController.getAll((err,result) => {
                if(err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    } else if (path === '/flightDetails') {
        return new Promise(function(resolve, reject) {
            flightDetailsController.getDetail(filter, (err,result) => {
                if(err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    } else if (path === '/seats') {
        return new Promise(function(resolve, reject) {
            seatDetailsController.getDetail(filter, (err,result) => {
                if(err) {
                    console.log(err);
                    reject(Error(err));
                } else {
                    resolve(result);
                }
            });
        });
    }
};