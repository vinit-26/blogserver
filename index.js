// this is needed for importing expressjs into our application
const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const globalErrorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)

let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function (file){
    if(~file.indexOf('.js')){
        require(modelsPath+'/'+file);
    }
});

let routePath = './routes';
fs.readdirSync(routePath).forEach(function (file){
    if(file.indexOf('.js')){
        let route  = require(routePath+'/'+file);
        route.setRouter(app);
    }
});

app.use(globalErrorMiddleware.globalNotFoundHandler)

mongoose.set('useCreateIndex',true);
app.listen(appConfig.port,()=>{
    console.log('App listening on port 3330!');
    let db = mongoose.connect(appConfig.db.uri,{useNewUrlParser: true, useUnifiedTopology: true})
})

mongoose.connection.on('error',function(error){
    console.log('DataBase Connection Error')
});

mongoose.connection.on('open',function (error){
    if(error){
        console.log('DataBase Error');
    }else{
        console.log('Database Connected Successfully !!!');
    }
} )