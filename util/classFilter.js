// pass in the class number and the db connection (which includes the escapte function)
module.exports.classFilter = (classNum, db) => {
    let classFilter = '';
    if (classNum) {
        classFilter = ' AND class = ' + db.escape(classNum);
    }
    return classFilter;
};