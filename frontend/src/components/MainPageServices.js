import React , {useState} from 'react';
import rest from '../static/rest.jpg'
import gym from '../static/gym.webp'
import spa from '../static/spa2.jpg'
import ServicesInformation from './modal/ServicesInformation';
import LazyImage from './LazyImage';

const MainPageServices = () => {
    const [getMoreInfo, setGetMoreInfo] = useState(false)
    const [serviceTitle, setServiceTitle] = useState('false')

    return (
        <div id='services-block'>
            <div className='services-bg'></div>
              
            <div className='sevices-title'>Почему стоит к нам приехать?</div>           
             <div className='services-container'>
                <div style={{display:'flex'}} className='services-container-2'>
                    <div className='image-container'>
                        <div className='service-btn-div'>
                            <button className='service-get-more' 
                                style={{float:'right',paddingTop:'2px',paddingBottom:'2px'}} 
                                onClick={() => {
                                    setGetMoreInfo(true)
                                    setServiceTitle('rest')
                                }}>Подробнее
                            </button>
                        </div>
                        <p className='title-image'>Ресторан</p>
                         <img className='services-image' src={rest}/> 
                    </div>
                    <div className='image-container'>
                        <div className='service-btn-div'>
                            <button className='service-get-more' 
                                style={{float:'right',paddingTop:'2px',paddingBottom:'2px'}} 
                                onClick={() => {
                                    setGetMoreInfo(true)
                                    setServiceTitle('spa')
                                }
                                }>Подробнее
                            </button>
                        </div>
                        <p className='title-image'>Спа-салон</p>
                         <img className='services-image' src={spa}/>
                    </div>
                    <div className='image-container'>
                        <div className='service-btn-div'>
                            <button className='service-get-more' 
                                style={{float:'right',paddingTop:'2px',paddingBottom:'2px'}} 
                                onClick={() => {
                                    setGetMoreInfo(true)
                                    setServiceTitle('gym')
                                }}>Подробнее
                            </button>
                        </div>
                        <p className='title-image'>Спорт-зал</p>
                        <img className='services-image' src={gym}/>
                    </div>
                </div>
            </div>
            <ServicesInformation show={getMoreInfo} service={serviceTitle} onHide={() => setGetMoreInfo(false)}/>
             
        </div>
    );
}

export default MainPageServices;



{/* <div className='services-bg'></div>
        <div className='services-container'>
                <div className='services-wr'>
                    <div className='sevices-title'>Почему стоит к нам приехать?</div>
                    <div className='services-area'>
                    <div className='services-menu'>
                        <button className='btn-to-service' onClick={() => setActiveServiceImg(serviseImg[0])} >ресторан</button>
                        <button className='btn-to-service' onClick={() => setActiveServiceImg(serviseImg[1])}>спа-салон</button>
                        <button className='btn-to-service' onClick={() => setActiveServiceImg(serviseImg[2])}>спорт зал</button>
                    </div>
                    <div className='services-discribe'>
                      <Image className='services-picture' src={activeServiceImg}></Image>
                      <div style={{marginTop:"10px"}}><p>Наш основной ресторан, который работает для вас круглосуточно! Здесь вы сможете 
                        насладиться уютной и спокойной обстановкой, а также попробовать вкуснейшие блюда нашей
                         кухни.</p></div>
                        <button className='caurosel-btn' style={{float:'right',paddingTop:'2px',paddingBottom:'2px'}} onClick={() => setGetMoreInfo(true)}>Подробнее</button>
                    </div>
                    
                </div>
                </div>
                <div className='sevices-image-restorant'></div>
                <div className='sevices-image-gym'></div>
        </div>
        <ServicesInformation show={getMoreInfo} serviceInfo={serviceInfo} serviceTitle={serviceTitle} onHide={() => setGetMoreInfo(false)}></ServicesInformation> */}