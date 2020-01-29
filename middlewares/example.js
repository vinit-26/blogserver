let exampleMiddleware = (req,res,next) => {
    req.user = { "firstName": 'VINIT', "lastName": 'KUMAR' };
    next();
}

module.exports = {
    exampleMiddleware: exampleMiddleware
}