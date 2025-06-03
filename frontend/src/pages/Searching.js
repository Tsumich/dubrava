import React, { useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rooms from '../components/Rooms'
import CalendarBooking from '../components/CalendarBooking';
import { searchRooms } from '../axios';
 import { setBooking } from '../redux/slices';
import Bot from '../components/Bot';
import Footer from '../components/Footer';
import { useLayoutEffect } from 'react';

const Searching = () => {
    const [checkIn, setCheckIn] = useState(new Date())
    let temp = new Date()
    const dispatch = useDispatch()
    temp.setDate(checkIn.getDate() + 1)
    const [checkOut, setCheckOut] = useState(temp)
    const [guestsAmount, setGuestsAmount] = useState(1)
    const {rooms} = useSelector(state => state.rooms)
    const [vacancies, setVacancies] = useState()
    const [showCalendar, setShowCalendar] = useState(false)
 
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [ ]);

    let dayDifferent = useRef()
    if((checkIn && checkOut) && (checkOut > checkIn)){
        dayDifferent.current = Math.round((checkOut.setHours(0) - checkIn.setHours(0)) / (1000 * 60 * 60 * 24))
    }

    const submitSearch = () => {
        if(checkIn > checkOut) return
        if(!checkIn || !checkOut) return 
        const roomsId = []
        rooms.items.forEach( room => {
            if(room.guest_amount >= guestsAmount){
                roomsId.push(room.id)
            }
        })
        if(roomsId.length == 0) {
            setShowCalendar(true)
            return
        }

        const savedBooking = {
            checkIn: checkIn.toLocaleDateString(),
            checkOut: checkOut.toLocaleDateString(),
            checkInDry:checkIn,
            checkOutDry:checkOut,
            guestsAmount: guestsAmount,
            days: dayDifferent.current
        }
        dispatch(setBooking(savedBooking))

        const fields = {
			checkIn, checkOut, 
            roomsId
		}
        searchRooms(fields).then((data) => {
            const arrayOfBookingId = []
            data.forEach((bookingId) => {
                arrayOfBookingId.push(bookingId.roomId)
            })
            let temp = []
            rooms.items.forEach((room) => {
                if((roomsId.includes(room.id))){
                    if(!(arrayOfBookingId.includes(room.id))) {
                    temp.push(room)
                    }
                }
                
            })
            temp.length == 0? setShowCalendar(true) : setShowCalendar(false)
            setVacancies(temp) 
        })
    }

    return (

        <div className='wr-search' style={{height:'100%'}}>
            
            <div className='search'>
                <h5 className='title-parameters'>Параметры</h5>
                <table>
                <tbody>
                    <tr>
                        <td>
                            <div> Заезд: </div>
                        </td>
                        <td className='calendar-input'>
                            <Calendar 
                            locale='ru'
                            style={{fontSize:'15px', 
                                    height:'30px',
                                    maxWidth:'200px'}}
                            value={checkIn} 
                            showIcon 
                            onChange={(e) => e.value ? setCheckIn(e.value) : setCheckIn(temp)} 
                            dateFormat='yy/mm/dd'/>
                        </td>
                    </tr>

                    <tr >
                        <td>
                            <div> Выезд: </div>
                        </td>
                        <td className='calendar-input'>
                        <Calendar 
                        locale='ru'
                        value={checkOut} 
                        showIcon 
                        onChange={(e) => {
                            setCheckOut(e.value)
                        } 

                        }
                         dateFormat='yy/mm/dd' 
                         style={{fontSize:'15px', height:'30px'}}/>
                        </td>
                    </tr>

                    <tr style={{height:'40px'}}>
                        <td>Суток:</td>
                        <td>{checkIn > checkOut || checkIn == checkOut ? "минимум 1 день!" : dayDifferent.current}</td>
                    </tr>

                    <tr>
                        <td  style={{width:'80px'}}>
                            Гостей: 
                        </td>
                        <td  style={{height:'40px'}}>
                            <input style={{height:"30px", width:'50px'}} value={guestsAmount} type='number' min="1" max="10" onChange={(e)=>setGuestsAmount(e.target.value)}></input>
                        </td>
                    </tr>

                   
                </tbody>
                </table>
                
              
                <Button className='search-button' type='submit' onClick={submitSearch}>Поиск</Button>
            </div>
            <div className='rooms'>
                { !showCalendar ? <Rooms rooms={vacancies?vacancies:rooms.items}/> :
                <CalendarBooking startDate={checkIn} rooms={rooms}/>
                }
            </div>
            
            <Bot/>
            
        </div>
    ) 
    
}

export default Searching;
