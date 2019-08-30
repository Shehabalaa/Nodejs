module.exports = (req, res, next) => {
    for (let index = 0; index < 500000000; index++) {
    }
    next();
};