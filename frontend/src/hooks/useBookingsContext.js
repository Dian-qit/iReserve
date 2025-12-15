import { BookingsContext } from '../context/bookingContext'
import { useContext } from 'react'

export const useBookingsContext = () => {
    const context = useContext(BookingsContext)

    if (!context) {
        throw Error('useBookingContext must be used inside a BookingsContextProvider') 
    }

    return context
}