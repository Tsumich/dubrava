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

    useEffect(() => {
        if (booking){let temp = []
            console.log('bokking effect')
        for(let i=0; i<booking.guestsAmount ; i++){
            temp.push({
                name: '',
                lastName: '',
                number:  Date.now()+ i
            })
        }
        setGuests(temp)}   
    }, [])

    
     const sendForm = async (event) => {
        const roomId = room ? room.id : booking.room.id
        const checkIn = booking.checkInDry
        const checkOut = booking.checkOutDry
        const price = room ? room.price * booking.days : booking.room.price * booking.days
        const confirmed = booking.confirmed ? true : false
        const formData = {
            checkIn, checkOut, roomId, guests, name, lastName, phoneNumber, price, confirmed
        }
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        
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

    const setGuestName = (key, value, number) => {
        setGuests(guests.map(i => i.number === number ? {...i, [key]: value? value : ''} : i))
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
            <div  className='booking-price'>
                 Стоимость: {room ? room.price * booking.days : booking.room.price * booking.days} руб.
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
                    <input onChange={e => {
                        setLastName(e.target.value)
                        if(imGuest == true) {
                            setGuests(guests.map(i => i.number === guests[0].number ? {...i, 
                                ['lastName']: lastName} : i))
                        }
                    }} required/>
                </div>
                <div className='client-fio-line'>
                    <div>Имя:</div>
                    <input onChange={e => setName(e.target.value)} required/>
                </div>
                <div className='client-number-line'>
                    <div>Телефон:</div>
                    <input onChange={e => setPhoneNumber(e.target.value)} required/>
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
                            <td><input required value={imGuest && i == 0 ? lastName : null} id={i+1} onChange={(e) => setGuestName('lastName', e.target.value, i.number)}  style={{marginRight:'10PX', 
                                }} /></td>
                            <td><input required value={imGuest  && i == 0 ? name : null} onChange={(e) => setGuestName('name', e.target.value, i.number)}/></td>
                        </tr>
                    )
                })}
                </tbody>
                </table>

                <div className="flex align-items-center">
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
