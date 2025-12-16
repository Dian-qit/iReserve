const Landing = () => {
    return (
        <div className="landing-container">
            <div className="landing-hero">
                <h1>Made Booking Campus Room Easier </h1>
                <p>Your ultimate room booking solution.</p>
                <button><a href="/home" className="btn">Explore Rooms</a></button>
            </div>
            <div className="landing-information">
                <div className="information-container">
                    <h1>How to Reserve a Room</h1>
                    <p>1. Click on "Explore Rooms" to view available rooms.</p>
                    <p>2. Select a room and click "Book Now".</p>
                    <p>3. Fill in your booking details and confirm.</p>
                </div>
            </div>
        </div>
    );
}

export default Landing;