var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Reservation = new Schema({
  name: {
    type: String
  },
  hotelName:{
    type: String
  },
  arrivalDate:{
    type: String
  },
  departureDate:{
    type: String
  }

},{
	collection: 'reservations'
});

module.exports = mongoose.model('Reservation', Reservation);
