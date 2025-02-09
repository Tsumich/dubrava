import React from 'react';
import logo2 from '../static/logo2.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector, logout } from '../redux/slicesAuth';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
	const isAuth = useSelector(isAuthSelector)
    console.log(isAuth , 'isAUth')
 	const onClickLogout = () => {
		if(window.confirm('Выйти?')){
			dispatch(logout())
			window.localStorage.removeItem('token')
		}
	};


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
            {isAuth ? <div>
                <button className='header-button' onClick={(() => {
                    navigate('/admin')
                })}>Профиль</button>
                <button className='header-button' onClick={onClickLogout}>Выйти</button>
            </div>
            : <></>}

            <div className='headerContacts'> </div>
        </div>
    );
}

export default Header;
