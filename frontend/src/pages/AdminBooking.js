import React, {useState} from 'react';
import Booking from '../components/Booking';
import CreateUser from '../components/modal/CreateUser'
import Sidebar from '../components/Sidebar';
            //<CreateUser show={createUser} onHide={() => setCreateUser(false)}></CreateUser>
 
const AdminBooking = () => {
    return (
        <div>
            <Sidebar/>
            <Booking showingEnd={false}/>
        </div>
    );
}

export default AdminBooking;
