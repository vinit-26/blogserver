let appConfig = {};

appConfig.port = process.env.PORT || 3330;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "env";
appConfig.db = {
    // uri:"mongodb://127.0.0.1:27017/blogAppDB",
    uri: 'mongodb+srv://vinit:vinit2608@cluster0-sxxm9.mongodb.net/test?retryWrites=true&w=majority'
}
appConfig.apiVersion = "/api/v1";

module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}