const express = require('express');
const app = express();
const reservationRouter = express.Router();

// Require Reservation model in our routes module
var Reservation = require('../models/Reservation');

// Defined store route
reservationRouter.route('/add/post').post(function (req, res) {
  var reservation = new Reservation(req.body);
      reservation.save()
    .then(reservation => {
    res.status(200).json({Reservation: 'Reservation added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
reservationRouter.route('/').get(function (req, res) {
  Reservation.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

//Defined get single reservation route
reservationRouter.route('/search/:id').get(function (req, res) {
  console.log('ID', req.params.id);
  var id = req.params.id;
  Reservation.findById(id, function (err, reservation){
    res.json(reservation);
  });
});

// Defined edit route
reservationRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Reservation.findById(id, function (err, reservation){
      res.json(reservation);
  });
});

//  Defined update route
reservationRouter.route('/update/:id').post(function (req, res) {
  Reservation.findById(req.params.id, function(err, reservation) {
    if (!reservation)
      return next(new Error('Could not load Document'));
    else {
      reservation.name = req.body.name;
      reservation.hotelName = req.body.hotelName;
      reservation.arrivalDate = req.body.arrivalDate;
      reservation.departureDate = req.body.departureDate;

      reservation.save().then(reservation => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
reservationRouter.route('/delete/:id').get(function (req, res) {
  Reservation.findByIdAndRemove({_id: req.params.id},
	   function(err, reservation){
		if(err) res.json(err);
		else res.json('Successfully removed');
	});
});

module.exports = reservationRouter;
