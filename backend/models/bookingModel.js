const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)
