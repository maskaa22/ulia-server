const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const {usersRouter, commentsRouter, poemRouter} = require('./routes/index');

const app = express();

app.use(cors({
  credentials: true, origin: 'http://localhost:3000', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));

mongoose.connect('mongodb+srv://ulia:ulia123987@cluster0.maqudan.mongodb.net/?retryWrites=true&w=majority');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/poems', poemRouter);

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

async function start() {
  try {
      app.listen(5000, () => {
          console.log('Server start', 5000);
      });  
  }
  catch {
      console.log('Sorry!!!')
  }
}
start();

module.exports = app;
