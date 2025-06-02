import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const [expanded, setExpanded] = useState(false)
    const navigate = useNavigate()
    const {data} = useSelector(state => state.auth)
    const role = data==null? 'USER' : data.role


    return (
        <aside className={expanded ? 'sidebar-expanded' : 'sidebar'}>
            <div className={expanded ? 'profile-expanded' : 'profile'}
             onMouseEnter={() => setExpanded(!expanded)}
             onMouseLeave={() => setExpanded(!expanded)}>
                {expanded ? <p className='profile-title' >{data ? data.login : ''}</p> : <></>}
                <div className='line' style={{backgroundColor:'#fff'}}></div>
                <div className='profile-el' onClick={() => navigate('/admin/req')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#7c7575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8V16" stroke="#7c7575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 12H16" stroke="#7c7575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {expanded ? <p>Заявки</p> : <></>}
                </div>
                <div className='profile-el' onClick={() => expanded ? navigate('/admin/bookings') : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10" stroke="#7c7575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z" stroke="#7c7575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z" stroke="#7c7575" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {expanded ? <p>Бронирование</p> : <></>}
                </div>
                {role == 'ADMIN' ? <div className='admin-zone'>
                    <div className='line' style={{backgroundColor:'#fff'}}></div>
                    <div className='profile-el' onClick={() => expanded ? navigate('/admin/users') : ''}>               
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M23 21.0009V19.0009C22.9993 18.1146 22.7044 17.2536 22.1614 16.5532C21.6184 15.8527 20.8581 15.3524 20 15.1309" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 3.13086C16.8604 3.35116 17.623 3.85156 18.1676 4.55317C18.7122 5.25478 19.0078 6.11769 19.0078 7.00586C19.0078 7.89403 18.7122 8.75694 18.1676 9.45855C17.623 10.1602 16.8604 10.6606 16 10.8809" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {expanded ? <p>Пользователи</p> : <></>}
                    </div>
                    <div className='profile-el' onClick={() => expanded ? navigate('/roomslist') : ''}>                                  
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 22V12H15V22" stroke="#25282B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {expanded ? <p>Дома</p> : <></>}
                    </div>
                </div> : <></>}
            </div>        
        </aside>
    );
}

export default Sidebar;
