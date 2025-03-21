import React, { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';
import { createPayment } from '../../axios';

const CreatePayment = ({show, onHide, booking}) => {
    const [bookingId, setBookingId] = useState(booking.id)
      const addPayment = () => {
        const formData = {
            bookingId
        }
        createPayment(formData).then(data => onHide()) 
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
                        <div>Дом: {''}</div>
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
                <Button className='booking-admin-payment' onClick={addPayment} style={{width:'120px'}}> Подтвердить</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreatePayment;
