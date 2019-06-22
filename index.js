const searchController = require('./app/controllers/searchController');
exports.handler = async (event) => {
    // if there is nothing in querystring, then just pass an empty obj instead of undefined
    const filter = (event && event.params && event.params.querystring) ? event.params.querystring : {};
    console.log('below is the filter');
    console.log(filter);

  const promise = new Promise(function(resolve, reject) {
        searchController.get(filter, (err,result) => {
            if(err) {
                console.log(err);
                reject(Error(err));
            } else {
                resolve(result);
            }
        });
  });
  return promise
};