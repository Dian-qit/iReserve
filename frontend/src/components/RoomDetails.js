import { Link } from 'react-router-dom'

const RoomDetails = ({ room }) => {
    return (
        <div className="room-details">
            <h4>{room.roomName}</h4>
            <p><strong>Capacity:</strong> {room.capacity}</p>
            <p><strong>Status:</strong> {room.isAvailable ? "Available" : "Booked"}</p>
            <Link to={`/book-room/${room._id}`}>
                <button>{room.isAvailable ? "Book Now" : "View Booking"}</button>
            </Link>
        </div>
    )
}


export default RoomDetails;