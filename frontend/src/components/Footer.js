import React from 'react';
import logo2 from '../static/logo2white.png'

const Footer = () => {
    return (
        <div className='footer'>
             
            <div className='footer-main-info' >

                <div style={{display:'flex', height:'60px'}}>
                    <img src={logo2} className='logo-icon' style={{height:'60px'}}/>
                    <div style={{ fontSize:'20px', width:'120px', margin:"auto"}}>DUBRAVA</div>
                </div>
                <div style={{fontSize:'12px', marginLeft:"20px"}}>
                    <p>д. Ляпки ул. Центральная , 1г</p>
                    <p>+7 983 253 1000</p>
                    <p>grk.lukomorye@yandex.ru</p>
                    <div> © Tsumi, 2025</div>
                </div>
            </div>
            <div className='footer-site-menu'>
                <h5>Главное меню</h5>
                <div className='line' style={{backgroundColor:"#fff", width:"90%", marginBottom:"10px"}}></div>
                <p>Дома</p>
                <p>Спа салон</p>
                <p>Ресторан</p>

            </div>
            <div className='footer-contacts' >
                <h5>База отдыха</h5>
                <div className='line' style={{backgroundColor:"#fff", width:"90%", marginBottom:"10px"}}></div>
                <p>О нас</p>
                <p>Бронирование и оплата</p>
                <p>Правила проживания</p>
            </div>
           
        </div>
    );
}

export default Footer;
