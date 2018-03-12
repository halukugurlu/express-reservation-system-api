var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
//var port = 4200;
//var cors = require('cors');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');

// mongodb://hugurlu:6764546@ds163918.mlab.com:63918/reservations
//'mongodb://127.0.0.1/my_database'
mongoose.connect('mongodb://hugurlu:6764546@ds163918.mlab.com:63918/reservations')
  .then(() => { // if all is ok we will be here
  console.log('Start');
})
.catch(err => { // if error we will be here
  console.error('App starting error:', err.stack);
process.exit(1);
});

// Required application specific custom router module
var itemRouter = require('./src/routes/reservationRoutes');


// Use middlewares to set view engine and post json data to the server
//app.use(cors());

var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });

//Heroku get's confused with browser router vs express router
//Define specificly to use index.html
//it can be done more elegantly but time is limited
app.get('/add-item',function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/search',function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/index',function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/edit/:id',function(req,res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/reservations', itemRouter);

// Start the server
app.listen(app.get('port'), function(){
  console.log('Server is running on Port: ', app.get('port'));
});
