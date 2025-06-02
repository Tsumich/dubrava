import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo2 from '../static/logo2white.png';

const Footer = ({showFooter}) => {
    const [footer, setFooter] = useState(showFooter ? showFooter : true)
    const navigate = useNavigate()
    const aboutBooking = () => document.getElementById('about-booking');

    return (
        footer ? 
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
                    <div> © DudravaBase, 2025</div>
                </div>
            </div>
            <div className='footer-menu-wr'>
                <div className='footer-site-menu'>
                    <h5>Главное меню</h5>
                    <div className='line' style={{backgroundColor:"#fff", width:"90%", marginBottom:"10px"}}></div>
                    <p style={{cursor:"pointer"}} onClick={() => navigate('/search')}>Дома </p>
                    <p style={{cursor:"pointer"}} onClick={() => navigate('/')}>Спа салон</p>
                    <p style={{cursor:"pointer"}} onClick={() => navigate('/')}>Ресторан</p>

                </div>
                <div className='footer-site-menu' >
                <h5>База отдыха</h5>
                <div className='line' style={{backgroundColor:"#fff", width:"90%", marginBottom:"10px"}}></div>
                <p style={{cursor:"pointer"}} onClick={() => navigate('/about')}>О нас</p>
                <p style={{cursor:'pointer'}} onClick={() => {
                        if(window.location.pathname != '/about'){      
                            navigate('/about?search=about-booking')  
                        }  
                    }}>Бронирование и оплата</p>
                <p style={{cursor:'pointer'}} onClick={() => {
                        if(window.location.pathname != '/about'){      
                            navigate('/about?search=booking-rules')  
                        }  
                    }}>Правила проживания</p>
            </div>
           </div>
        </div> : <div></div>
    );
}

export default Footer;
