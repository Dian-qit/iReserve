const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  // store start and end time as Date objects (clients should send ISO strings)
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Booking', bookingSchema)
