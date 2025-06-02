import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBooking, getRoom } from '../redux/slices';
import { useNavigate } from 'react-router-dom';
import house from '../static/house.png'
import calendar from '../static/calendar.png'
import { Button } from 'react-bootstrap';
import { createBooking } from '../axios';
import PersonalDataDoc from '../components/modal/PersonalDataDoc';
import Information from '../components/modal/Information';
//aaaa

import InputMask from 'react-input-mask';

const BookingForm = () => {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [booking, setBooking] = useState( useSelector(getBooking))
    if(!booking)  {navigate('/search')}
    const [room, setRoom] = useState( useSelector(getRoom))
    const [guests, setGuests] = useState ([])
    const [imGuest, setImGuest] = useState(false)
    const [lastName, setLastName] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [getDoc, setGetDoc] = useState(false)
    const serverMessage = useRef('')
    const [showMessage, setShowMessage] = useState(false)
    const [showErrorMessage, setShowErrMessage] = useState(false)

    useEffect(() => {
        if (booking){let temp = []
        for(let i=0; i<booking.guestsAmount ; i++){
            temp.push({
                name: '',
                lastName: '',
                number: i
            })
        }
        setGuests(temp)}   
    }, [])

    const setGuestName = (key, value, number) => {
        setGuests(guests.map(i => i.number === number ? {...i, [key]: value? value : ''} : i))
    }

     const sendForm = async (event) => {
        const roomId = room ? room.id : booking.room.id
        const checkIn = booking.checkInDry
        const checkOut = booking.checkOutDry
        const price = room ? room.price * booking.days : booking.room.price * booking.days
        const confirmed = booking.confirmed ? true : false

        const guestsCollection = guests
      
        if(imGuest){
            guestsCollection[0].name = name
            guestsCollection[0].lastName = lastName
        }

        const formData = {
            checkIn, checkOut, roomId, guestsCollection, name, lastName, phoneNumber, price, confirmed
        }
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        if (phoneNumber.replace(/\D/g, '').length < 11) return setShowErrMessage(true)
            else setShowErrMessage(false)
        const showModal = () => {
            setLoading(false)
            setShowMessage(true)
        }
       
        await new Promise((resolve) => {
            setLoading(true)
            setTimeout(resolve, 2000)
                   
        })
            createBooking(formData).then(data => {  
            serverMessage.current = data
            showModal(data)
        })
    }

      return (
        <div>
            {!booking ? <div> {navigate('/')}</div>
            :
            <div className='booking-wr'>
               
            <div  className='container-booking'>    
            <div className='booking-panel'>
                <div className='booking-title'>Заказ</div>
                <div className='booking-room-title'>
                    <img src={house} style={{width:'30px'}}/>
                    {room ? room.title : booking.room.title}
                </div>
                <div className='booking-dates'>
                    <img src={calendar} style={{width:'30px'}}/>
                    {booking.checkIn} - {booking.checkOut}
                </div>
                
                <div  className='booking-guest-amount'>
                    Гостей: {booking.guestsAmount}
                </div>  
            </div>
             
            </div>  
            
            <div className='booking-form' style={{marginBottom:'20px'}}>
                 <form onSubmit={ sendForm } id='sendForm'> 
                <div className='booking-title'>Данные о заказе</div>

                <div className='client-title-container'>
                    <div className='client-title' >Покупатель</div>
                    {
                        name && lastName ? 
                    
                    <div class="form-check" >
                    <input class="form-check-input" onClick={() => setImGuest(!imGuest)} type="checkbox" ONvalue="" id="flexCheckIndeterminate"/>
                    <label class="form-check-label" for="flexCheckIndeterminate">
                        Я гость
                    </label>
                    </div>
                    : <></>
                    }
                </div>
                <div className='client-fio-line'>
                    <div>Фамилия:</div>
                    <input className='input-guest' 
                        onChange={e => {
                        setLastName(e.target.value)
                        // if(imGuest == true) {
                        //     console.log(guests[0])
                        //    setGuestName('lastName', e.target.value, guests[0].number)
                        //    console.log(guests[0])
                        // }
                    }} required/>
                </div>
                <div className='client-fio-line'>
                    <div>Имя:</div>
                    <input onChange={e => {
                        setName(e.target.value)
                        // if(imGuest == true) {
                        //    setGuestName('name', name, guests[0].number)
                        // }
                        }} className='input-guest' required/>
                </div>
                <div className='client-number-line'>
            
                    <div style={{display:'block'}}>Телефон:</div>
                    <div>
                        <InputMask
                            className='input-guest'
                            mask="+7(999) 999-99-99"
                            placeholder="+7(---) --- -- --"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            required
                        /> 
                    </div>
                    
                    
                </div>
                {showErrorMessage ? <div style={{width:'100%', color:"red"}}>Некорректно заполнено поле</div> : <></>}
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
                         
                        <tr  key={guest.number}>    
                            <td><div style={{width:'50px',
                                     marginRight:'10px'}}>Гость {i+1}</div></td>
                            <td>
                                <input className='input-guest' 
                                    disabled={imGuest && i == 0 ? lastName : false} 
                                    required 
                                    value={imGuest && i == 0 ? lastName : null} 
                                    id={i+1} 
                                    onChange={(e) => setGuestName('lastName', e.target.value, guest.number)} 
                                    style={{marginRight:'10PX', 
                                }}/>
                            </td>
                            <td>
                                <input className='input-guest' 
                                    disabled={imGuest && i == 0 ? lastName : false} 
                                    required 
                                    value={imGuest  && i == 0 ? name : null} 
                                    onChange={(e) => setGuestName('name', e.target.value, guest.number)}/>
                                </td>
                        </tr>
                    )
                })}
                </tbody>
                </table>
                <div  className='booking-price'>
                        Стоимость: {room ? room.price * booking.days : booking.room.price * booking.days} руб.
                    </div> 
                <div className="flex align-items-center accepting-msg">
                    <input required class="form-check-input" type='checkbox'/>
                    <label htmlFor="ingredient1"className="ml-2">Я согласен с <a onClick={() => setGetDoc(true)} href='#'>условиями обработки персональных данных</a></label>
                </div>

                {
                    !isLoading ? 
                    <Button type='submit'  className='btn-submit'   >Отправить</Button>                 
                : <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                 </div>
              }
                </form>
             </div>
             <PersonalDataDoc show={getDoc} onHide={() => setGetDoc(false)}/>
             <Information show={showMessage} message={serverMessage.current} onHide={() => setShowMessage(false)}></Information>
            </div>
            }
        </div>
    );
}
export default BookingForm;
