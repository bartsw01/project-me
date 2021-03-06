const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
require('dotenv').config();
require('./config/database')
require('./config/passport')

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');
const commentsRouter = require('./routes/comments')
const categoriesRouter = require('./routes/categories')
const apiRouter = require('./routes/api')
const signupRouter = require('./routes/signup')
const userRouter = require('./routes/user')
const session = require('express-session')
const passport = require('passport')
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/posts',postRouter);
app.use('/api', apiRouter);
app.use('/categories',categoriesRouter);
app.use('/user',userRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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
