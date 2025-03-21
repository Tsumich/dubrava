import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Information = ({show, onHide, message}) => {
    const navigate = useNavigate()
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {message ? message : ''}
                </Modal.Title>
            </Modal.Header>
           
            <Modal.Footer>
                <Button onClick={e => navigate('/')}> Закрыть</Button>

            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Information;
