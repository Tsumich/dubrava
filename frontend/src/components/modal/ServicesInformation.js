import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ServicesInformation = ({show, onHide, booking}) => {
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Заголовок
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Информация об услуге</div>

            </Modal.Body>
            <Modal.Footer>
                Какая нибудь еще информация
             </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ServicesInformation;
