const searchController = require('./app/controllers/searchController');
const airportDetailsController = require('./app/controllers/airportDetailsController');

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
    }
};