// This isn't precisely uncurrying as that is usually meant, but I couldn't
// think of a better name for "with extra arguments appended to the callback
// call"
module.exports = function(cb, ...extraArgs) {
    return function(error, result) {
        cb(error, result, ...extraArgs);
    };
};
