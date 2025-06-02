import React, { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';
import { createUser } from '../../axios';

const CreateUser = ({show, onHide}) => {
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')

    const [role, setRole] = useState('')

    const addUser = () => {
        const formData = {
            role, login, 
            password
        }
        createUser(formData).then(data => onHide())
    }

    const roles = ['ADMIN', 'USER']

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать нового пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <div class="dropdown">
                        <button style={{marginBottom:'10px'}} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            {!role.length ? "Роль" : role}
                        </button>
                        <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
                            {roles.map(role => {
                               return  <li  onClick={() => setRole(role)}><a class="dropdown-item  " href="#">{role}</a></li>
                            })}
                        </ul>
                        <div>Логин<input value={login} onChange={(e) => {setLogin(e.target.value)}} ></input></div>
                        <div>Пароль<input value={password} onChange={(e) => setPassword(e.target.value)} ></input></div>

                    </div>

                    
                    
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}> Закрыть</Button>
                <Button onClick={addUser}> Создать</Button>

            </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateUser;
