import { useEffect, useState } from "react"

// components
import RoomDetails from "../components/RoomDetails"

const Home = () => {
    const[rooms, setRooms] = useState(null)
    const[isPending, setIsPending] = useState(true)

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await fetch('/api/rooms')
            const json = await response.json()
            
            if(response.ok) {
                setRooms(json)
                setIsPending(false)
            }
        }

        fetchRooms()
    }, [])

    return (
        <div className="home">
          
            {isPending && <div>Loading...</div>}
            <div className="rooms">
                {rooms && rooms.map((room) => (
                    <RoomDetails key={room._id} room={room} />
                ))}
            </div>
        </div>
    );
}

export default Home;