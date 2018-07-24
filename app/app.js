var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./lib/dbcon');
const bodyParser = require('body-parser');

// Authentication Package 
var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');
var LocalStrategy = require('passport-local');
var session = require('express-session');
var pg = require('pg')
  , session = require('express-session')
  , pgSession = require('connect-pg-simple')(session);
 
var pgPool = new pg.Pool({
    // Insert pool options here
    user: 'admin',
    host: 'localhost',
    database: 'test_db',
    password: 'admin',
    port: 5432,
});
 



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// use middleware 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session middleware
// app.use(session({
//   secret: 'kjasfskflsaflasfk',
//   resave: false,
//   saveUninitialized: false,
//   // cookie: { secure: true }
// }));
app.use(session({
  store: new pgSession({
    pool : pgPool,                // Connection pool
    tableName : 'session'   // Use another table-name than the default "session" one
  }),
  secret: 'alsdfkjhasdfkj',
  resave: false,
  saveUninitialized:false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username);
    console.log(password);
    const query = {
      text:`SELECT * FROM public.user WHERE userEmail='${username}'`
    };
    db.query(query,function(err, result){
      if(err){
        console.log(err)
      }
      if(result.rows.length === 0){
        done(null, false)
      }
      const hash = result.rows[0].userPassword;  
      console.log(hash);
      bcrypt.compare(password,hash, function(err,response){
        if(response === true){
          return done(null,{user_id:`23`})
        }else{
          return done(null, false);
        }
      });
      return done(null,"some message");
    })
   
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
