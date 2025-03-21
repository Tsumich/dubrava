import React, {useState} from 'react';
import Booking from '../components/Booking';
import Ending from '../components/Ending';
import { Button } from 'react-bootstrap';
import CreateUser from '../components/modal/CreateUser'
import Sidebar from '../components/Sidebar';

import { useSelector } from 'react-redux';

const Admin = () => {
    const [createUser, setCreateUser] = useState(false)
    const {data} = useSelector(state => state.auth)
    return (
        <div>
            <Sidebar/>
            <div className='admin-page-title'>
                <div className='admin-page-info'>
                    <div>Здравствуйте, {data ? data.login : ''}</div>
                    <div>15:40</div>
                </div>
                {/* {<div className='admin-page-btns'>
                    <div> <Button type='button' className='button-more'>Бронирования</Button>
                     <Button type='button' style={{float:"right", marginLeft:'10px'}} className='button-more'>Заявки</Button></div>
                    <div> <Button type='button' onClick={() => setCreateUser(true)} style={{float:"right"}} className='button-more'>Новый пользователь</Button></div>
                </div> */
                }
            </div>
            <Booking showingEnd={true}/>
             <CreateUser show={createUser} onHide={() => setCreateUser(false)}></CreateUser>
        </div>
    );
}

export default Admin;
