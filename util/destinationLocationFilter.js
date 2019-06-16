// pass in the destination location list and the db connection (which includes the escapte function)
module.exports.destinationLocationFilter = (destinationLocation, db) => {
    let destinationLocationFilter = ''; // filter to be used on sql query
    let destinationLocationArray = null;
    if(destinationLocation) {destinationLocationArray = destinationLocation.split(',');} // still in string form after getting passed as a query parameter if there is something the destination_location object
    if(Array.isArray(destinationLocationArray)) {
        let i;
        let destinationLocationLength = destinationLocationArray.length;
        let sqldestinationLocationList = '';
        for (i = 0; i < destinationLocationLength; i++) {
            let comma = ',';
            if(i === destinationLocationLength - 1) {comma = '';}// last element will not have a comma after it
            sqldestinationLocationList = sqldestinationLocationList + db.escape(destinationLocationArray[i]) + comma;
        }
        destinationLocationFilter = ' AND destination IN (' + sqldestinationLocationList + ')';
    }
    return destinationLocationFilter;
};