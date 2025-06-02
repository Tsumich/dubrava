import React, {useLayoutEffect, useState} from 'react';
import Booking from '../components/Booking';
import CreateUser from '../components/modal/CreateUser'
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isAuthSelector } from '../redux/slicesAuth';
import { useEffect } from 'react';


const AdminBooking = () => {
    return (
        <div>
            <Sidebar/>
            <Booking showingEnd={false}/>
        </div> 
    );
}

export default AdminBooking;
