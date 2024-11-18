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
                    Подтвердить оплату
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        value={booking.id}>
                        </FormControl>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> NO</Button>
                <Button onClick={addPayment}> OK</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreatePayment;
