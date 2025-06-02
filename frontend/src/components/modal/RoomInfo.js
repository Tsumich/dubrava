import React, { useState, useRef } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, Form, FormControl, Modal } from 'react-bootstrap';
import { editRoomPrice, saveInfosChanges, uploadRoomImage } from '../../axios';
 

const RoomInfo = ({show, onHide, room, edit}) => {
const [price, setPrice] = useState()
const [title, setTitle] = useState('')
const [info, setInfo] = useState('')
const [file, setFile] = useState(null);

const uploadImage = async (image,) => {
    //const filename =` ${roomName}_${index}`;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('newName', file.name);
    formData.append('oldName', image);
    uploadRoomImage(formData)
}

return (
    <div>
    {edit == 'image' ? 
        <Modal show={show} onHide={onHide} centered>
            <div>
                <div className='admin-image-edit-wr'>
                    <div style={{display:'flex', alignItems:"center"}} className='admin-image-edit-wr-div'>
                        <img className='admin-image-edit' src={`http://176.196.11.180:9000/${room?.image[0]?.image}`} style={{height:'200px'}}/>
                        <div className='infos-inputs'>  
                            <div>Заголовок</div>
                            <input 
                                placeholder={room.image[0].title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <div>Подпись</div>
                            <input 
                                placeholder={room.image[0].info}
                                onChange={(e) => setInfo(e.target.value)}
                            />
                            <button className='admin-room-action' onClick={() =>  saveInfosChanges(room?.image[0].id, title, info)}>Изменить</button>
                        </div> 
                    </div>
                    <div>
                       <label for="avatar">Главное фото</label>
                        <input type="file" 
                            id="avatar" 
                            onChange={(e) => setFile(e.target.files[0])}
                            name="avatar" 
                            accept="image/png, image/jpeg" /> 
                        {file ? <button className='admin-room-action' onClick={() => uploadImage(room.image[0].image)}>Сохранить фото</button> : <></>}
                    </div>
                    
                </div>

                <div className='admin-image-edit-wr'>
                    <div style={{display:'flex', alignItems:"center"}} className='admin-image-edit-wr-div'>
                        <img className='admin-image-edit' src={`http://176.196.11.180:9000/${room?.image[1]?.image}`} style={{height:'200px'}}/>
                        <div className='infos-inputs'>  
                            <div>Заголовок</div>
                            <input 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={room.image[1].title}
                            />
                            <div>Подпись</div>
                            <input 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={room.image[1].info}
                            />
                            <button className='admin-room-action' onClick={() => saveInfosChanges(room.image[1])}>Изменить</button>
                        </div> 
                    </div>
                    <div>
                       <label for="avatar">Фото №2</label>
                        <input type="file" 
                            id="avatar" 
                            name="avatar" 
                            accept="image/png, image/jpeg" /> 
                    </div>
                </div>

                <div className='admin-image-edit-wr'>
                    <div style={{display:'flex', alignItems:"center"}} className='admin-image-edit-wr-div'>
                        <img className='admin-image-edit' src={`http://176.196.11.180:9000/${room?.image[2]?.image}`} style={{height:'200px'}}/>
                        <div className='infos-inputs'>  
                            <div>Заголовок</div>
                            <input 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={room.image[2].title}
                            />
                            <div>Подпись</div>
                            <input 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={room.image[2].info}
                            />
                            <button className='admin-room-action' onClick={() => saveInfosChanges(room.image[2])}>Изменить</button>
                        </div> 
                    </div>
                    <div>
                       <label for="avatar">Фото №3</label>
                        <input type="file" 
                            id="avatar" 
                            name="avatar" 
                            accept="image/png, image/jpeg" /> 
                    </div>
                </div>

                <div className='admin-image-edit-wr'>
                    <div style={{display:'flex', alignItems:"center"}} className='admin-image-edit-wr-div'>
                        <img className='admin-image-edit' src={`http://176.196.11.180:9000/${room?.image[3]?.image}`} style={{height:'200px'}}/>
                        <div className='infos-inputs'>  
                            <div>Заголовок</div>
                            <input 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={room.image[3].title}
                            />
                            <div>Подпись</div>
                            <input 
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder={room.image[3].info}
                            />
                            <button className='admin-room-action' onClick={() => saveInfosChanges(room.image[3])}>Изменить</button>
                        </div> 
                    </div>
                    <div>
                       <label for="avatar">Фото №4</label>
                        <input type="file" 
                            id="avatar" 
                            name="avatar" 
                            accept="image/png, image/jpeg" /> 
                    </div>
                </div>

            </div>
        </Modal> 
        : 
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
                        placeholder={room ? room.price : ''}
                        onChange={(e) => setPrice(e.target.value)}
                        type='number'
                        min={0}>
                    </input>
                    <button type='button' className='admin-room-action' onClick={() =>{ 
                        editRoomPrice(room.id, price)
                        onHide()
                        }}>Изменить</button>
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}> Закрыть</Button>
        </Modal.Footer>
        </Modal> 
            }
        </div>
    );
}

export default RoomInfo;
