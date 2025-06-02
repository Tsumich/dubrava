import React, {useState} from 'react';
import Booking from '../components/Booking';
import Ending from '../components/Ending';
import { Button } from 'react-bootstrap';
import CreateUser from '../components/modal/CreateUser'
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthSelector } from '../redux/slicesAuth';

const Admin =  () => {
    const [createUser, setCreateUser] = useState(false)
  
    return (
        <div>
            <Sidebar/>
            <div className='admin-page-title'>
                <div className='admin-page-info'>
    
                </div>
                {
                }
            </div>
            <Booking showingEnd={true}/>
            <CreateUser show={createUser} onHide={() => setCreateUser(false)}></CreateUser>
        </div>
    );
}

export default Admin;
