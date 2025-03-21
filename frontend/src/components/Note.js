import React, { useState } from 'react';
import paid from '../static/paid.png'
import { Button } from 'react-bootstrap';
import { confirmRequest, createPayment } from '../axios';
import CreatePayment from './modal/CreatePayment';

const Note = ({booking, loading, checkPaid, isRequest}) => {
    const [createPayment, setCreatePayment] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

     if(loading){
        return <h3>Loading....</h3>
     }
     let year = new Date(booking.checkIn).getFullYear()
     let month = new Date(booking.checkIn).getMonth()
     let day = new Date(booking.checkIn).getDay()

     let year2 = new Date(booking.checkOut).getFullYear()
     let month2 = new Date(booking.checkOut).getMonth()
     let day2 = new Date(booking.checkOut).getDay()
 
    return ( 
        <> 
        <tr className='booking-table'>
            <td >{booking.room ? booking.room.title : ''}</td>
            <td>{booking.checkIn}</td>
            <td>{booking.checkOut}</td>

            {
                !isRequest ? 
            
            <td>{booking.IsPaid == true ? 
                
            <svg width="24" style={{width:'100%'}} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> 
            : 
            <Button className='booking-admin-payment' onClick={() => setCreatePayment(true)}>Подтвердить</Button>}
            </td> :
            <>
                <td>{`${booking.lastName} ${booking.name}`}</td>
                <td>{booking.phoneNumber}</td>
                <div style={{display:"flex"}}>
                    <button style={{margin:"0"}}>Удалить</button>
                    <button style={{margin:"0", marginLeft:"10px"}} onClick={() => confirmRequest(booking.id)}>Подтвердить</button>
                </div>
                
            </>
            
            }
        </tr>
        <CreatePayment booking={booking}  show={createPayment} onHide={() => setCreatePayment(false)}></CreatePayment>
        </> 
    );

}

export default Note;
