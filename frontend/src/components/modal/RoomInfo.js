import React, { useState, useRef } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';
import { editRoom } from '../../axios';

const RoomInfo = ({show, onHide, room}) => {
    const priceRef = useRef(room ? room.price : '')
    const [price, setPrice] = useState()

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить стоимость проживания
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>                       
                    <p>Стоимость проживания</p>
                    <div style={{display:'flex'}}>
                        <input
                        value={room ? room.price : ''}
                        onChange={(e) => setPrice(e.value)}>
                        </input>
                        <button className='admin-room-action'  >Изменить</button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрыть</Button>
             

            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RoomInfo;
