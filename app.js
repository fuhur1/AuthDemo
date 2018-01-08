var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var User  = require('./models/userModel');
var passport = require('passport');
var localStrategy = require('passport-local');

//var passportLocalMongoose = require('passport-local-mongoose');

// import routes
var index = require('./routes/index');
var secret = require('./routes/secret');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express();

//DB connect
var connectDB = require('./midleware/database');
connectDB();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')(
    {
        secret: 'Janka épp a villámtolvajt olvassa',
        resave: false,
        saveUninitialized: false
    }
));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Routes
app.use('/', index);
app.use('/secret',secret);
app.use('/register',register);
app.use('/login',login);
app.use('/logout',logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
