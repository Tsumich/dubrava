import React from 'react';
import { observer} from 'mobx-react-lite';
import { Button, Image } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import car2 from '../static/car2.jpg'
import car4 from '../static/car4.jpg'
import Bot from '../components/Bot';
import pic1 from '../static/pic111.jpg'

const MainPage = observer(() => {
    const history = useNavigate()
    return (
        <div className='main-page-component'>
        <div className='mainPage'>
            <div class='textOnMainPage'>
                <p className='textOnMainPageSRT1'>Первый шаг к лучшему отдыху</p>
                <p className='textOnMainPageSRT2'>Для тех кто устал от городской суеты</p>
                <button className='buttonOnMainPage' onClick={() => history('/search')}>
                    Бронирование
                </button>
            </div>
           </div>

          <div className="container-for-line"> <div className='line'></div></div>


         <div className='container-center'>

            <div className='container-row'>
            <div className='container-carousel' >
            <div id="carouselExampleIndicators" 
                class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner"  style={{width:'400px', height:'450px'}}>
                    <div class="carousel-item active">
                    <img src={car2} class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                    <img src={car4} class="d-block w-100" alt="..."/>
                    </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
             </div>  
            </div>

            <div className='text-carousel'>
                <div className='text-carousel-main'>
                    БАЗА ОТДЫХА ДУБРАВА — УЮТНОЕ И УЕДИНЕННОЕ МЕСТО В ЛЕСНОЙ
                    ЗОНЕ, КУДА МОЖНО ПРИЕХАТЬ В ЛЮБОЕ ВРЕМЯ ГОДА
                </div>
                <div className='text-carousel-bottom'>
                    Уникальное расположение вдали от города, стильный интерьер и все удобства 
                    дают возможность расслабиться и получить качественный отдых
                </div>
                    <button onClick={() => history('/search')} className='caurosel-btn' >{ ">> "}перейти к просмотру домов { "<<"}</button>
            </div>
            </div>
        </div>
    
        <div className="container-for-line"> <div className='line'></div></div>
        <div className='services-container'>
                <div className='services-wr'>
                    <div className='sevices-title'>Почему стоит к нам приехать?</div>
                    <div className='services-area'>
                         
                    <div className='services-menu'>
                        <button className='btn-to-service'>ресторан</button>
                        <button className='btn-to-service'>спа-салон</button>
                        <button className='btn-to-service'>спорт зал</button>
                    </div>
                    <div className='services-discribe'>
                      <Image className='services-picture' src={pic1}></Image>
                      <div>наш основной ресторан, который работает для вас круглосуточно! Здесь вы сможете насладиться уютной и спокойной обстановкой, а также попробовать вкуснейшие блюда нашей кухни.</div>
                        <button className='service-more-btn'>Подробнее</button>
                    </div>
                    
                </div>
                </div>
                <div className='sevices-image-restorant'></div>
                <div className='sevices-image-gym'></div>
        </div>

 
        <Bot/>
        </div>
    );
})

export default MainPage;
