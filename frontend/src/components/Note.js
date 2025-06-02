import React, { useRef, useState } from 'react';
import paid from '../static/paid.png'
import { Button } from 'react-bootstrap';
import { confirmRequest, createPayment } from '../axios';
import CreatePayment from './modal/CreatePayment';

const Note = ({booking, loading, checkPaid, isRequest, isConfirmed}) => {
    const [createPayment, setCreatePayment] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const showInfo = useRef(false)

     if(loading){
        return <h3>Loading....</h3>
     }
     let year = new Date(booking.checkIn).getFullYear()
     let month = new Date(booking.checkIn).getMonth()
     let day = new Date(booking.checkIn).getDay()

     let year2 = new Date(booking.checkOut).getFullYear()
     let month2 = new Date(booking.checkOut).getMonth()
     let day2 = new Date(booking.checkOut).getDay()
console.log(showInfo.current)
     return ( 
        <> 
        <tr className='booking-table'>
            <td className='booking-show-info' onClick={() => 
                {   showInfo.current = true
                    setCreatePayment(true)
                }}>
            {booking.room ? booking.room.title : ''}</td>
            <td>{booking.checkIn}</td>
            <td>{booking.checkOut}</td>

            {
                !isRequest ? 
            
            <td>
        {booking.IsPaid == true || isUpdated == true? 
                
            <svg width="24" style={{width:'100%'}} height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> 
            : 
            <Button className='booking-admin-payment' style={{width:'50%'}} onClick={() => setCreatePayment(true)}>Подтвердить</Button>}
            </td> :
            <>
            <td>{`${booking.lastName} ${booking.name}`}</td>
            <td>{booking.phoneNumber}</td>
            <td>
                {isUpdated ? <div>

                </div> :
                <div style={{display:"flex"}}>
                    <Button className='admin-delete-btn booking-admin-payment '>Удалить</Button>
                    <Button className='booking-admin-payment' style={{ width:'55%'}} onClick={() => setCreatePayment(true)}>Подтвердить</Button>
                </div>}
            </td>
            </>      
            }
        </tr>
            <CreatePayment 
                booking={booking}
                isRequest={isRequest}
                isConfirmed={isConfirmed} 
                showInfo={showInfo.current}
                show={createPayment} 
                onCreate={() => {
                    setIsUpdated(true)
                    setCreatePayment(false)
                    showInfo.current = true
                }}
                onHide={() => {
                    showInfo.current = false
                    setCreatePayment(false)}}>
            </CreatePayment>
        </> 
    );

}

export default Note;
