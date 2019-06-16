// given an array and 
module.exports = (array, db) => {
    let i;
    let arrayLength = array.length;
    let sqlArray = '';
    for (i = 0; i < arrayLength; i++) {
        let comma = ',';
        if(i === arrayLength - 1) {comma = '';} // last element will not have a comma after it
        sqlArray = sqlArray + db.escape(array[i]) + comma;
    }
    return sqlArray;
};