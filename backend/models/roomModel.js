const mongoose = require('mongoose')

const Schema = mongoose.Schema

const room = new Schema({
    roomName: { 
        type: String,
        required: true
    },
    capacity: { 
        type: Number, 
        required: true  
    },
    isAvailable: { 
        type: Boolean, 
        default: true 
    }
}, { timestamps: true })

module.exports = mongoose.model('Room', room)
 