require('dotenv').config()

const express = require('express')
const roomsRoutes = require('./routes/rooms')
const bookingRoutes = require('./routes/booking')
const { default: mongoose } = require('mongoose')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method),
    next()
})

// routes
app.use('/api/rooms', roomsRoutes)
app.use('/api/bookings', bookingRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`listening for requests on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

