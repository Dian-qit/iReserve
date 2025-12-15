const Room = require('../models/roomModel')
const Booking = require('../models/bookingModel')
const mongoose = require('mongoose')

const now = () => new Date()

const syncRoomAvailability = async (roomId) => {
    const nowDate = now();
    
    // Find any active booking for the given room ID
    const activeBooking = await Booking.findOne({
        room: roomId,
        startTime: { $lte: nowDate },
        endTime: { $gt: nowDate }
    });

    // Fetch the room to update
    const room = await Room.findById(roomId);

    if (room) {
        const isCurrentlyAvailable = !activeBooking;
        if (room.isAvailable !== isCurrentlyAvailable) {
            room.isAvailable = isCurrentlyAvailable;
            await room.save();
        }
        return isCurrentlyAvailable;
    }
    return true; 
}

// bubble
const bubbleSortRooms = (rooms) => {
    const n = rooms.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            const name1 = rooms[i].roomName;
            const name2 = rooms[i + 1].roomName;

            if (name1.localeCompare(name2) > 0) {
                [rooms[i], rooms[i + 1]] = [rooms[i + 1], rooms[i]];
                swapped = true;
            }
        }
    } while (swapped);
    // 
    return rooms;
};

// get all rooms
const getRooms = async (req, res) => {
    const rooms = await Room.find({})

    const sortedRooms = bubbleSortRooms(rooms);
    
    res.status(200).json(rooms)
}

//get a single room
const getRoom = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such room' })
    }   

    const room = await Room.findById(id)
    if (!room) {
        return res.status(404).json({ error: 'No such room' })
    }

    await syncRoomAvailability(id);

    res.status(200).json(room)
}

//create a new room
const createRoom = async (req, res) => {
    const {roomName, capacity } = req.body

    //add doc to db
    try {
        const room = await Room.create({roomName, capacity})
        res.status(200).json(room)
    }catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a room
const deleteRoom = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such room' })
    }

    const room = await Room.findOneAndDelete({_id: id})

    if (!room) {
        return res.status(400).json({ error: 'No such room' })
    }

    res.status(200).json(room)
}

// update a room    
const updateRoom = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such room' })
    }

    const room = await Room.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true})

    if (!room) {
        return res.status(400).json({ error: 'No such room' })
    }   

    await syncRoomAvailability(id);

    res.status(200).json(room)

}


module.exports = {
    getRooms,
    getRoom,
    createRoom,
    deleteRoom,
    updateRoom 
}