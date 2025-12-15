import React, { useState } from 'react';
import { useBookingsContext } from '../hooks/useBookingsContext';

// Receive roomId, roomName, and onBookingSuccess handler as props
const BookingForm = ({ roomId, roomName, onBookingSuccess }) => {
    
    const { dispatch } = useBookingsContext();
    const [userName, setUserName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Quick check to prevent submission if no room ID is somehow present
        if (!roomId) {
            setError("Cannot book: Room ID is missing.");
            return;
        }

        const bookingData = {
            roomId, // Automatically using the prop
            userName,
            startTime, 
            endTime
        };
        
        setIsLoading(true);
        setError(null);

        // NOTE: Ensure your POST endpoint handles the body data correctly.
        const response = await fetch('/api/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        setIsLoading(false);

        if (!response.ok) {
            setError(json.error);
        }

        if (response.ok) {
            // Success: Clear form and call the success handler from props
            setUserName('');
            setStartTime('');
            setEndTime('');
            setError(null);
            onBookingSuccess(); 
            dispatch({ type: 'ADD_BOOKING', payload: json });
        }
    }

    // Step value in seconds for 30 minutes (30 * 60)
    const stepInSeconds = 1800; 

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>New Booking for: {roomName}</h3>

            {/* Room ID is displayed/used internally, not edited by the user */}
            <input type="hidden" value={roomId} />

            <label>User Name:</label>
            <input 
                type="text" 
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
            />

            <label>Start Time (30 min aligned):</label>
            <input 
                type="datetime-local" 
                onChange={(e) => setStartTime(e.target.value)}
                value={startTime}
                step={stepInSeconds} 
                required
            />

            <label>End Time (30 min aligned):</label>
            <input 
                type="datetime-local" 
                onChange={(e) => setEndTime(e.target.value)}
                value={endTime}
                step={stepInSeconds} 
                required
            />

            <button disabled={isLoading}>
                {isLoading ? 'Booking...' : 'Book Now'}
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default BookingForm;