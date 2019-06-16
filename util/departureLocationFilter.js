// pass in the departure location list and the db connection (which includes the escapte function)
module.exports.departureLocationFilter = (departureLocation, db) => {
    // filter to be used on sql query
    let departureLocationFilter = '';
    let departureLocationArray = null;
    // still in string form after getting passed as a query parameter
    // if there is something the departure_location object
    if(departureLocation) {departureLocationArray = departureLocation.split(',');}

    if(Array.isArray(departureLocationArray)) {
        let i;
        let departureLocationLength = departureLocationArray.length;
        let sqldepartureLocationList = '';
        for (i = 0; i < departureLocationLength; i++) {
            let comma = ',';
            // last element will not have a comma after it
            if(i === departureLocationLength - 1) {comma = '';}
            sqldepartureLocationList = sqldepartureLocationList + db.escape(departureLocationArray[i]) + comma;
        }
        departureLocationFilter = ' AND departure IN (' + sqldepartureLocationList + ')';
    }
    return departureLocationFilter;
};