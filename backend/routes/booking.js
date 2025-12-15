const express = require('express')
const {
    getBookings,
    createBooking,
    getBooking,
    deleteBooking,
    updateBooking,
    getBookingsByRoom
} = require('../controllers/bookingControllers')    



const router = express.Router()

// gett all bookings
router.get('/', getBookings)

// get a single booking
router.get('/:id', getBooking) 

// get bookings for a specific room
router.get('/room/:roomId', getBookingsByRoom)

// post a new booking
router.post('/', createBooking)

// update a booking (Use PATCH/PUT for updates)
router.patch('/:id', updateBooking)

// delete a booking (Use DELETE for deletions)
router.delete('/:id', deleteBooking)

module.exports = router