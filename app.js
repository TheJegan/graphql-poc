var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');


let schema = buildSchema(`
  type Query {
    getLebronNews: [lebron]
  }

  type lebron{
    title: String
    credibleNewsSource: String
  }
`);


let root = {
  getLebronNews: [{
    title: "reasons why lebron is better than jordan",
    credibleNewsSource: "https://www.forbes.com/sites/leighsteinberg/2018/05/31/5-reasons-why-lebron-is-the-greatest-of-all-time/"
  },
  {
    title: "reasons why lebron is better than steph curry",
    credibleNewsSource: "https://www.forbes.com/sites/leighsteinberg/2018/05/31/5-reasons-why-lebron-is-the-greatest-of-all-time/"
  }]
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


// app.use('/graphql', usersRouter)
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
