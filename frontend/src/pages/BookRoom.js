import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useBookingsContext } from "../hooks/useBookingsContext"

// components
import BookingDetails from '../components/BookingDetails'
import BookingForm from "../components/bookingForm" // Corrected filename case for clarity

const BookRoom = () => {
    const { id } = useParams() 
    const [room, setRoom] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const { bookings, dispatch } = useBookingsContext()

    // New function to handle fetching the data
    const fetchData = async () => {
        setIsPending(true);
        setError(null);
        let roomData = null; 

        try {
            // Fetch Room Details
            const roomRes = await fetch(`/api/rooms/${id}`);
            const roomJson = roomRes.ok ? await roomRes.json() : null;

            if (roomJson) {
                setRoom(roomJson);
                roomData = roomJson; 
            } else {
                // Check for 404 specifically
                if (roomRes.status === 404) {
                    setError(`Room not found for ID: ${id}.`);
                } else {
                    setError(`Failed to fetch room details (Status: ${roomRes.status}).`);
                }
                setRoom(null);
            }

            // Fetch Bookings for the room (only if room data was fetched successfully)
            if (roomData) {
                const bookingsRes = await fetch(`/api/bookings/room/${id}`); 
                const bookingsJson = bookingsRes.ok ? await bookingsRes.json() : [];
                dispatch({ type: 'SET_BOOKINGS', payload: bookingsJson });
            } else {
                dispatch({ type: 'SET_BOOKINGS', payload: [] });
            }

        } catch (err) {
            console.error("Fetch error:", err);
            setError("An unexpected error occurred while fetching data.");
            setRoom(null);
            dispatch({ type: 'SET_BOOKINGS', payload: [] });
        } finally {
            setIsPending(false);
        }
    }


    const handleBookingSuccess = () => {
        fetchData();

        console.log("Booking successful. Refreshing data...");
    }


    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    
    if (isPending) {
        return <div className="book-room-loading">Loading room and booking details...</div>;
    }
    
    if (error || !room) {
        return <div className="book-room-error">{error || `Room not found for ID: ${id}.`}</div>;
    }

    
    return (
        <div className="book-room">
            
            <h2>Room: {room.roomName}</h2>
            <p><strong>Capacity:</strong> {room.capacity}</p>
            <p><strong>Current Status:</strong> <span style={{ color: room.isAvailable ? 'green' : 'red', fontWeight: 'bold' }}>
                {room.isAvailable ? "Available" : "Booked"}
            </span></p>


            <div className="booking-container">
                <h3>Today's Bookings</h3> 
                <div className="bookings">
                    
                    {bookings && bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <BookingDetails key={booking._id} booking={booking} onDeleteSuccess={fetchData} />
                        ))
                    ) : (
                        <p>No bookings found for this room today.</p>
                    )}
                </div>
                
                <BookingForm 
                    roomId={id}
                    roomName={room.roomName}
                    onBookingSuccess={handleBookingSuccess} 
                    // No onClose handler needed here, as the form is integrated directly.
                />
            </div>
        </div>
    );
}

export default BookRoom;