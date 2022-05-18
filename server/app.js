var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require("express-session");

var MysqlStore = require("express-mysql-session")(session);
var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'itc801',
	database: 'board'
};

var sessionStore = new MysqlStore(options);



//데이터베이스에 연결하려면 Sequelize 인스턴스를 생성해야 한다.
const { Sequelize } = require('sequelize');

//global => 프로젝트의 어디에서든 접근할 수 있다.
global.sequelize = new Sequelize('board', 'root', 'itc801', {
  host: 'localhost',//mysql의 connection명과 동일하게 설정하는가?
  dialect: "mysql"//사용하는 DB명
});

//model.js가 실행되도록
require("./model.js");






var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var boardRouter = require('./routes/board');

var app = express();

app.use(session({
	key: 'session_key',
	secret: 'qwerasdfzxcv',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/board', boardRouter);

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
