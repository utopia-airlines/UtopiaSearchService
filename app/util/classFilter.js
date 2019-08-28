// pass in the class number and the db connection (which includes the escape function)
module.exports.classFilter = (classNum, db) => {
    if (classNum) {
        return ` AND class = ${db.escape(classNum)}`;
    } else {
        return '';
    }
};