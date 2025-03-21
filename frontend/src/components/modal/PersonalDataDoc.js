import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';

const PersonalDataDoc = ({show, onHide}) => {
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Условия персональных данных
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div></div>

            </Modal.Body>
            <Modal.Footer>
                <Button className='booking-admin-payment' onClick={onHide}> Ок</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PersonalDataDoc;
