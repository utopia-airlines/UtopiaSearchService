module.exports = function(obj, ...names) {
    for (var name of names) {
        delete obj[name];
    }
};
