// given an array and 
module.exports = (array, db) => {
    // cannot abbreviate to just db.escape because it will throw an error
    return array.map((item) => db.escape(item)).join(',');
};