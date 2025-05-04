import React, { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';
import { createPayment, setConfirmed } from '../../axios';
import { useSelector } from 'react-redux';

const CreatePayment = ({show, onHide, booking, isConfirmed}) => {
    const [bookingId, setBookingId] = useState(booking.id)
    const {data} = useSelector(state => state.auth)
console.log(isConfirmed)
    const action = () => {
        const userId = data.id
        const formData = {
            userId,
            bookingId
        }
        isConfirmed ? setConfirmed(formData).then(data => onHide()) : createPayment(formData).then(data => onHide()) 
    }

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Данные о заказе
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <div style={{display:'flex'}}>
                    <div>
                        <div>Дом: {booking.room.title}</div>
                        <div>Дата заезда: {booking.checkIn}</div>
                        <div>Дата выезда: {booking.checkOut}</div>
                    </div>
                    <div style={{margin:'auto'}}>
                        <div>Имя клиента: {booking.lastName} {booking.name}</div>
                        <div>Сумма к оплате: {booking.price}</div>
                    </div>
                    </div>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button className='booking-admin-payment' onClick={onHide}> Нет</Button>
                <Button className='booking-admin-payment' onClick={action} style={{width:'120px'}}> Подтвердить</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreatePayment;
