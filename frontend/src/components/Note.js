import React, { useState } from 'react';
import paid from '../static/paid.png'
import { Button } from 'react-bootstrap';
import { createPayment } from '../axios';
import CreatePayment from './modal/CreatePayment';

const Note = ({booking, loading, checkPaid}) => {
    const [createPayment, setCreatePayment] = useState(false)

     if(loading){
        return <h3>Loading....</h3>
     }
     let year = new Date(booking.checkIn).getFullYear()
     let month = new Date(booking.checkIn).getMonth()
     //console.log(month)
     let day = new Date(booking.checkIn).getDay()

     let year2 = new Date(booking.checkOut).getFullYear()
     let month2 = new Date(booking.checkOut).getMonth()
     let day2 = new Date(booking.checkOut).getDay()
//`${year}/${month}/${day}`
console.log(booking)
    return ( 
        <> 
        <tr>
            <td>{booking.room ? booking.room.title : ''}</td>
            <td>{booking.checkIn}</td>
            <td>{booking.checkOut}</td>
            <td>{booking.IsPaid == true ? 
                <img src={paid} style={{width:"20px", height:"20px"}}/> : 
                <Button  onClick={() => setCreatePayment(true)}>Оплатить</Button>}</td> 
        </tr>
        <CreatePayment booking={booking} show={createPayment} onHide={() => setCreatePayment(false)}></CreatePayment>
        </> 
    );

}

export default Note;
