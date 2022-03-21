var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session')
var cors = require('cors')

var app = express();


//Database
var db = require('mongoose');
const { stringify } = require('querystring');
db.connect('mongodb://localhost:27017/data', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err)
    console.log("MongoDB connection error: "+err);
  else
    console.log("Connected to MongoDB");
});

var musicSchema = new db.Schema({
  MusicId: String,
  MusicName: String,
  Category: String,
  Composer: String,
  Description: String,
  Price: String,
  Published: String,
  'New Arrival': String,
  Image: String,
  Clip: String
});

var userSchema = new db.Schema({
  UserID: String,
  PW: String
});

var cartSchema = new db.Schema({
  MusicId: Object,
  UserID: String,
  Quantity : Number
});

var music = db.model("music", musicSchema, "music");
var user = db.model("user", userSchema, "user");
var cart = db.model("cart", cartSchema, "cart");

user.find(function(err, docs) {
  console.log(user.db.host); // localhost
  console.log(user.db.port)
  console.log(user.db.name);
  
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: "backend",resave: false, saveUninitialized: true, cookie: {secure: false, maxAge : 60 * 60 * 1000} }))
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))


app.use(express.static(__dirname + 'public'))

app.use(function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin','http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  req.music = music; 
  req.user = user; 
  req.cart = cart; 
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);



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
