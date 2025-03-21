import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { rest_desc, gym_desc, spa_desc} from '../../description';
const ServicesInformation = ({show, onHide, service}) => {
    let title = ''
    let content = ''

    switch (service) {
        case 'rest':
            title = rest_desc.title
            content = rest_desc.content
            break;
        case 'spa':
            title = spa_desc.title
            content = spa_desc.content
            break;
        case 'gym':
          title = gym_desc.title
          content = gym_desc.content
          break;
        default:
            break;
      }
    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{content}</p>

            </Modal.Body>
            {//<Modal.Footer>
               // Какая нибудь еще информация
             //</Modal.Footer>
             }
            </Modal>
        </div>
    );
}

export default ServicesInformation;
