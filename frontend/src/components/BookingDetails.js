const BookingDetails = ({ booking, onDeleteSuccess }) => { 

    if (!booking) {
        return null
    }

    const roomName = booking.room ? (booking.room.roomName || booking.room.name || 'Room Details Unavailable') : 'N/A'
    
    const handleClick = async () => {
        const response = await fetch('/api/bookings/' + booking._id, { 
            method: 'DELETE'
        })

        if (response.ok) {
            if (onDeleteSuccess) {
                onDeleteSuccess();
            }
        }
    }


    const formatTime = (isoString) => {
        if (!isoString) return 'Invalid Time';
        
        const date = new Date(isoString);
        return date.toLocaleTimeString(); 
    }

    return (
        <div className="booking-details">
            
            <h4>Room: {roomName}</h4>
            
            <p><strong>User Name:</strong> {booking.userName}</p>
            <p><strong>Start Time:</strong> {formatTime(booking.startTime)}</p>
            <p><strong>End Time:</strong> {formatTime(booking.endTime)}</p>
            {/* Added styling for better visibility */}
            <span 
                onClick={handleClick} 
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
                DELETE
            </span>
        </div>
    )
}

export default BookingDetails