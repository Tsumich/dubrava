import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Information = ({show, onHide, message}) => {
    const navigate = useNavigate()
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header style={{fontSize:"24px"}}>
                Уведомление
            </Modal.Header>
            <Modal.Body style={{fontSize:"20px"}}>
                {message ? message : ''}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={e => window.location.reload()} className='btn-submit'> Закрыть</Button>
            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Information;
