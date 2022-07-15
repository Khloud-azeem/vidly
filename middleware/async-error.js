module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            //hayroo7 ll next middleware which is error mw
            next(ex);
        }
    };
}