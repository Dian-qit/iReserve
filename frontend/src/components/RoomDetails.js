const RoomDetails = ({ room }) => {
    return (
        <div className="room-details">
            <h4>{room.roomName}</h4>
            <p><strong>Capacity:</strong> {room.capacity}</p>
            <p><strong>Status:</strong> {room.isAvailable ? "Available" : "Booked"}</p>
            <button>{room.isAvailable ? "Book Now" : "View Booking"}</button>
        </div>
    )
}


export default RoomDetails;