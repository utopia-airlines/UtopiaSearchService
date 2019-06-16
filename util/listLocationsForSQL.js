// given an array and 
module.exports = (locationList, db) => {
    let i;
    let locationLength = locationList.length;
    let sqldepartureLocationList = '';
    for (i = 0; i < locationLength; i++) {
        let comma = ',';
        if(i === locationLength - 1) {comma = '';} // last element will not have a comma after it
        sqldepartureLocationList = sqldepartureLocationList + db.escape(locationList[i]) + comma;
    }
    return sqldepartureLocationList;
};