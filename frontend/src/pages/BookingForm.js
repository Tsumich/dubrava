import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBooking, getRoom } from '../redux/slices';
import { useNavigate } from 'react-router-dom';
import house from '../static/house.png'
import calendar from '../static/calendar.png'
import { Button } from 'react-bootstrap';
import { Checkbox } from 'primereact/checkbox';
import { createBooking } from '../axios';

const BookingForm = () => {
    const navigate = useNavigate()
    const [booking, setBooking] = useState( useSelector(getBooking))
    console.log(booking)
    if(!booking)  {navigate('/search')}
    const [room, setRoom] = useState( useSelector(getRoom))
    const [guests, setGuests] = useState ([])
    const [imGust, setImGuest] = useState(false)
    const [lastName, setLastName] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        if (booking){let temp = []
        for(let i=0; i<booking.guestsAmount ; i++){
            let number = Date.now()
            temp.push({
                name: '',
                lastName: '',
                number:  Date.now()
            })
        }
        setGuests(temp)}
    }, [])

     const sendForm = () => {
        const roomId = room.id
        const checkIn = booking.checkInDry
        const checkOut = booking.checkOutDry
        const formData = {
            checkIn, checkOut, roomId, guests, name, lastName, phoneNumber
        }
        createBooking(formData)
    }

    const setGuestName = (key, value, number) => {
        setGuests(guests.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    return (
        <div>
            {!booking ? <div> {navigate('/')}</div>
            :
            <div>
            <div className='container-booking'>    
            <div className='booking-panel'>
                <div className='booking-title'>Заказ</div>
                <div className='booking-room-title'>
                    <img src={house} style={{width:'30px'}}/>
                    {room.title}
                </div>
                <div className='booking-dates'>
                    <img src={calendar} style={{width:'30px'}}/>
                    {booking.checkIn} - {booking.checkOut}
                </div>
                
                <div  className='booking-guest-amount'>
                    Гостей: {booking.guestsAmount}
                </div>  
            </div>
            <div  className='booking-price'>
                {console.log(room)}
                Стоимость: {room.price * booking.days} руб.
                </div> 
            </div>

        

            <div className='booking-form' style={{marginBottom:'20px'}}>
                <div className='booking-title'>Данные о заказе</div>

                <div className='client-title-container'>
                    <div className='client-title' style={{marginBottom:"10px"}}>Покупатель</div>
                    
                    <div class="form-check" >
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate"/>
                    <label class="form-check-label" for="flexCheckIndeterminate">
                        Я гость
                    </label>
                    </div>
                </div>
                <div className='client-fio-line'>
                    <div>Фамилия:</div>
                    <input onChange={e => setLastName(e.target.value)}/>
                </div>
                <div className='client-fio-line'>
                    <div>Имя:</div>
                    <input onChange={e => setName(e.target.value)}/>
                </div>
                <div className='client-number-line'>
                    <div>Телефон:</div>
                    <input onChange={e => setPhoneNumber(e.target.value)}/>
                </div>

                <div className='client-title' style={{
                    marginTop:"20px"
                }}>
                    Гости
                </div>
                <table>
                     <tr>
                        <td ></td>
                        <td style={{textAlign:'center', color:"#9c999e"}}>Фамилия</td>
                        <td style={{textAlign:'center', color:"#9c999e"}}>Имя</td>
                    </tr>
                     <tbody>
                    {guests.map((guest, i) => {  
                    return(
                        <tr  key={i.number}>    
                            <td><div style={{width:'50px',
                                     marginRight:'10px'}}>Гость {i+1}</div></td>
                            <td><input id={i+1} onChange={(e) => setGuestName('lastName', e.target.value, i.number)} style={{marginRight:'10PX', 
                                }} /></td>
                            <td><input  onChange={(e) => setGuestName('name', e.target.value, i.number)}/></td>
                        </tr>
                    )
                })}
                </tbody>
                </table>

                <div className="flex align-items-center">
                    <Checkbox inputId="ingredient1" name="pizza" value="Cheese"   />
                    <label htmlFor="ingredient1" className="ml-2">Я согласен с условиями обработки персональных данных</label>
                </div>

                <Button type='submit' onClick={() => sendForm()} className='btn-submit'>Отправить</Button>
            </div>
             
            </div>
            }
        </div>
    );
}

export default BookingForm;
