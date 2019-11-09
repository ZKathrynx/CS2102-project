var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* --- V7: Using dotenv     --- */
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/* --- V2: Adding Web Pages --- */
var aboutRouter = require('./routes/about');
/* ---------------------------- */

/* --- V3: Basic Template   --- */
var tableRouter = require('./routes/table');
var loopsRouter = require('./routes/loops');
/* ---------------------------- */

/* --- V4: Database Connect --- */
var selectRouter = require('./routes/select');
/* ---------------------------- */

/* --- V5: Adding Forms     --- */
var formsRouter = require('./routes/forms');
/* ---------------------------- */

/* --- V6: Modify Database  --- */
var insertRouter = require('./routes/insert');
/* ---------------------------- */

var welcomeRouter = require('./routes/welcome');
var passengerFunctionsRouter = require('./routes/passengerFunctions');
var driverFunctionsRouter = require('./routes/driverFunctions');
var driverLoginRouter = require('./routes/driverLogin');
var passengerLoginRouter = require('./routes/passengerLogin');
var registerUserRouter = require('./routes/registerUser');
var registerCarRouter = require('./routes/registerCar');
var errorOccurRouter = require('./routes/errorOccur');
var viewAllAvailableRidesRouter = require('./routes/viewAllAvailableRides');
var bindBankAccountFromPassengerRouter = require('./routes/bindBankAccountFromPassenger');
var bindBankAccountFromDriverRouter = require('./routes/bindBankAccountFromDriver');
var viewBidStatusRouter = require('./routes/viewBidStatus');
var viewCurrentDealRideRouter = require('./routes/viewCurrentDealRide');
var viewDriverRankingRouter = require('./routes/viewDriverRanking');
var viewEvaluationsRouter = require('./routes/viewEvaluations');
var advertiseRideRouter = require('./routes/advertiseRide');
var viewBidsRouter = require('./routes/viewBids');
var complainRouter = require('./routes/complain');
var evaluateRouter = require('./routes/evaluate');
// TODO:
// bindBankAccount
// addValue
// viewAccount

// advertiseRide
// viewAllEvaluation
// viewBid

// searchRide
// viewBidStatus
// viewCurrentRide
var viewAccountRouter = require('./routes/viewAccount');
var addValueRouter = require('./routes/addValue');

var advertiseRideRouter = require('./routes/advertiseRide');

var searchRideRouter = require('./routes/searchRide');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* --- V2: Adding Web Pages --- */
app.use('/about', aboutRouter);
/* ---------------------------- */

/* --- V3: Basic Template   --- */
app.use('/table', tableRouter);
app.use('/loops', loopsRouter);
/* ---------------------------- */

/* --- V4: Database Connect --- */
app.use('/select', selectRouter);
/* ---------------------------- */

/* --- V5: Adding Forms     --- */
app.use('/forms', formsRouter);
/* ---------------------------- */

/* --- V6: Modify Database  --- */
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/insert', insertRouter);
/* ---------------------------- */

app.use('/welcome', welcomeRouter);
app.use('/passengerFunctions', passengerFunctionsRouter);
app.use('/driverFunctions', driverFunctionsRouter);
app.use('/driverLogin', driverLoginRouter);
app.use('/passengerLogin', passengerLoginRouter);
app.use('/registerUser', registerUserRouter);
app.use('/registerCar', registerCarRouter);
app.use('/errorOccur', errorOccurRouter);
app.use('/bindBankAccountFromDriver', bindBankAccountFromDriverRouter);
app.use('/bindBankAccountFromPassenger', bindBankAccountFromPassengerRouter);
app.use('/viewAllAvailableRides', viewAllAvailableRidesRouter);
app.use('/viewBidStatus', viewBidStatusRouter);
app.use('/viewCurrentDealRide', viewCurrentDealRideRouter);
app.use('/viewDriverRanking', viewDriverRankingRouter);
app.use('/viewEvaluations', viewEvaluationsRouter);
app.use('/advertiseRide', advertiseRideRouter);
app.use('/viewBids', viewBidsRouter);
app.use('/complain', complainRouter);
app.use('/evaluate', evaluateRouter);
// TODO:
// bindBankAccount
// addValue
// viewAccount

// advertiseRide
// viewAllEvaluation
// viewBid

// searchRide
// viewBidStatus
// viewCurrentRide
app.use('/viewAccount', viewAccountRouter);
app.use('/addValue', addValueRouter);

app.use('/advertiseRide', advertiseRideRouter);

app.use('/searchRide', searchRideRouter);

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
