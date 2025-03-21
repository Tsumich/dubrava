import React, { useRef, useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';
import { Calendar } from 'primereact/calendar';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../axios';
import { useNavigate } from 'react-router-dom';
import { setBooking } from '../../redux/slices';

const CreateBooking = ({show, onHide}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guestsAmount, setGuestAmount] = useState(1)
    
    const {rooms} = useSelector(state => state.rooms)
    const [room, setRoom] = useState(rooms.items[0])
    const {data} = useSelector(state => state.auth)
    const login = useRef(data ? data.login : '')
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const addBooking= () => {
        const roomId = room.id
        const formData = {
            checkIn, checkOut, 
            roomId,login
        }
        const dayDifferent = Math.round((checkOut.setHours(0) - checkIn.setHours(0)) / (1000 * 60 * 60 * 24))

        //dispatch(setRoom(room))
//
        const savedBooking = {
                checkIn: checkIn.toLocaleDateString(),
                checkOut: checkOut.toLocaleDateString(),
                checkInDry:checkIn,
                checkOutDry:checkOut,
                guestsAmount: guestsAmount,
                room:room,
                days: dayDifferent,
                confirmed: true
        }
        dispatch(setBooking(savedBooking))
        navigate('/booking')
        //createBooking(formData).then(data => onHide())
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Забронировать дом
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <div class="dropdown">
                        <button style={{marginBottom:'10px'}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            {room ? room.title : "Выбрать дом"}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                            {rooms.items.map(room => {
                               return  <li  onClick={() => setRoom(room)}><a class="dropdown-item  " href="#">{room.title}</a></li>
                            })}
                        </ul>
                    </div>

                    <Calendar className='admin-calendar' value={checkIn} 
                            placeholder='Дата заезда'
                            onChange={(e) => setCheckIn(e.value)} 
                            dateFormat='yy/mm/dd'
                            style={{fontSize:'13px', 
                                height:'30px',
                                width:'120px',
                                maxWidth:'200px'}}></Calendar>

                    <Calendar className='admin-calendar' value={checkOut}  
                            placeholder='Дата выезда'
                            onChange={(e) => setCheckOut(e.value)} 
                            dateFormat='yy/mm/dd'
                            style={{fontSize:'13px', 
                                height:'30px',
                                width:'120px',
                                maxWidth:'200px'}}></Calendar>
                    <div>Гости:</div>
                    <input type='number' onChange={(e) => setGuestAmount(e.target.value)}></input>
                             
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрыть</Button>
                <Button onClick={addBooking}> Сохранить</Button>

            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateBooking;
