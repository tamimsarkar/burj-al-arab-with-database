import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Booking from '../Booking/Booking';

const Book = () => {

    const [selectedDate, setSelectedDate] = useState({
        checkIn : new Date(),
        checkOut : new Date()
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkIn = date
      setSelectedDate(newDate);
    };
    const handleCheckoutDate = (date) => {
        const newDate = {...selectedDate}
        newDate.checkOut = date
        setSelectedDate(newDate);
      };
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const {bedType} = useParams();

    // handle bookings
    const handleBooking = () => {
        const newBooking = {...loggedInUser,...selectedDate}
        fetch('http://localhost:4000/addBooking/',{
            method : 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hey {loggedInUser.name}.Lets book an interest room for you at our burj..</h1>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            {/* Date picker  */}

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Handle Check in Date  "
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckoutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
        <Button onClick={handleBooking} variant='contained' color="primary">Book</Button>
    </MuiPickersUtilsProvider>
    <Booking />
        </div>
    );
};

export default Book;    