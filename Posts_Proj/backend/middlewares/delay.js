module.exports = (req, res, next) => {
    for (let index = 0; index <1000000000; index++) {
    }
    next();
};