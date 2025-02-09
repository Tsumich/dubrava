import React, {useState} from 'react';
import Booking from '../components/Booking';
import Ending from '../components/Ending';
import { Button } from 'react-bootstrap';
import CreateUser from '../components/modal/CreateUser'


const Admin = () => {
    const [createUser, setCreateUser] = useState(false)


    return (
        <div>
            <div className='admin-page-title'>
                <div className='admin-page-info'>
                    <div>Добрый вечер, Игорь</div>
                    <div>15:40</div>
                </div>
                <div className='admin-page-btns'>
                    <div> <Button type='button' className='button-more'>Бронирования</Button>
                     <Button type='button' style={{float:"right", marginLeft:'10px'}} className='button-more'>Заявки</Button></div>
                    <div> <Button type='button' onClick={() => setCreateUser(true)} style={{float:"right"}} className='button-more'>Новый пользователь</Button></div>
                </div>
            </div>
            <Booking showingEnd={true}/>
            <Booking showingEnd={false}/>
            <CreateUser show={createUser} onHide={() => setCreateUser(false)}></CreateUser>
        </div>
    );
}

export default Admin;
