const express = require('express')
const {
    createRoom,
    getRooms,
    getRoom,
    deleteRoom,
    updateRoom
    
} = require('../controllers/roomControllers')
const { get } = require('mongoose')

const router = express.Router()

// get all rooms
router.get('/', (getRooms))

// get a single room
router.get('/:id', (getRoom))

// post a new room
router.post('/', createRoom)

// delete a room
router.delete('/:id', deleteRoom)

// update a room
router.patch('/:id', updateRoom)

module.exports = router