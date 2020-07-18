var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

require('dotenv/config')

//Import Routes
const userRoute = require('./routes/user/user');
const postsRoute = require('./routes/forum/posts');




var app = express();



const cors = require('cors');

//set up cors config
app.use(cors());


/*
//MONGODB VERBINDEN (sienen code aus vorlesung noch checken u probieren --> kilians code)
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('Connected to DB')
});

//VERBINDUNG ENDE
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json()); //server except jason in body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects


//wenn Url abgerufen wird dann nutze die jeweilige Route
app.use('/user',userRoute);
app.use('/posts', postsRoute);
//app.use('/categories', categoryRoute);





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