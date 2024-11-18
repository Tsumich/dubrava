import React from 'react';
import logo2 from '../static/logo2.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()
    return (
        <div className='header'>
        
            <img src={logo2} className='logo-icon' style={{height:'60px'}} 
                onClick={(() => {
                    navigate('/')
                })}/>
            <div className='logo-text'>DUBRAVA</div>
             
            <div className='headerElement'>
                <button className='header-button'>О нас</button>
                <button className='header-button'>Услуги</button>
                <button className='header-button'>Проживание</button>
            </div>
            <div className='headerContacts'> </div>
        </div>
    );
}

export default Header;
