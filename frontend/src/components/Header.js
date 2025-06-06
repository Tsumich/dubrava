import React from 'react';
import logo2 from '../static/logo2.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector, logout } from '../redux/slicesAuth';

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
	const isAuth = useSelector(isAuthSelector)
        const aaa = useSelector(state => state.auth.data)
 	const onClickLogout = () => {
		if(window.confirm('Выйти?')){
			dispatch(logout())
			window.localStorage.removeItem('token')
            navigate('/')
		}
	};


    return (
        <div className='header'>
            <div className='logo-text'>
            <img src={logo2} className='logo-icon' style={{height:'60px'}} 
                onClick={(() => {
                    navigate('/')
                })}/>
            DUBRAVA</div>
             
            <div className='headerElement'>
                <button className='header-button' onClick={() => navigate('/about')}>О нас</button>
                <button className='header-button'
                    onClick={() => {
                        if(window.location.pathname == '/'){        
                            document.getElementById('services-block').scrollIntoView({behavior: 'smooth'})}
                        else{
                            navigate('/')
                            //document.getElementById('services-block').scrollIntoView({behavior: 'smooth'})
                        }
                    }}
                 >Услуги</button>
                <button className='header-button' onClick={()=> navigate('/search')}>Проживание</button>
            </div>
            {isAuth ? <div>
                <button className='header-button' onClick={(() => {
                    navigate('/admin/profile')
                })}>Профиль</button>
                <button className='header-button' onClick={onClickLogout}>Выйти</button>
            </div>
            : <></>}

            <div className='headerContacts'> </div>
        </div>
    );
}

export default Header;
