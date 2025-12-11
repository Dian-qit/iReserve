import { useEffect, useState } from "react"

// components
import RoomDetails from "../components/RoomDetails"

const Home = () => {
    const[rooms, setRooms] = useState(null)

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch('/api/rooms')
            const json = await response.json()
            
            if(response.ok) {
                setRooms(json)
            }
        }

        fetchRooms()
    }, [])

    return (
        <div className="home">
            <div className="rooms">
                {rooms && rooms.map((room) => (
                    <RoomDetails key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
}

export default Home;