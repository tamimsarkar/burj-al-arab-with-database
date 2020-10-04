import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [booking, setBooking] = useState([])
    useEffect(() => {
      fetch('http://localhost:4000/booking?email=' + loggedInUser.email ,{
          method : 'GET',
          headers : {
              authorization: `Bearer ${sessionStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
            
      })
      
      .then(res => res.json())
      .then(data => setBooking(data))
    }, [])
    return (
        <div>
            <h3>You just booked {booking.length} rooms</h3>
            {
                booking.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yyyy'))} to: {(new Date(book.checkOut).toDateString('dd/MM/yyyy'))}</li> )
            }
        </div>
    );
};
export default Booking;