process.env.PWD = process.cwd()
var express = require('express');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session')
var MongoStore = require('connect-mongo');
var app = express();
var port = 3000;

app.engine('.hbs', expressHbs.engine({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/wad_project"
    }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

var routes = require('./routes.js');
app.use('/', routes);
app.use(express.static(process.env.PWD + '/assets'));

app.listen(port, function () {
    console.log('Server started on port ' + port);
});

module.exports = app;