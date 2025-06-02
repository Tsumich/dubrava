import { useEffect } from 'react';
import image from '../static/about.jpg'
import search from '../static/search.PNG'
import form from '../static/form.PNG'
import { useLocation, useNavigate } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import env from "react-dotenv";

const About = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    useEffect(() => {    
        if(searchParams.get('search') == 'about-booking'){
            document.getElementById('about-booking').scrollIntoView({behavior: 'smooth'})
        } 
        if(searchParams.get('search') == 'booking-rules'){
            document.getElementById('booking-rules').scrollIntoView({behavior: 'smooth'})
        }
    }, []);


    const history = useNavigate()
    window.history.scrollRestoration = 'manual'
    return (
        <div>
        <div className='wr-about' style={{width:'100%', height:'100%', display:"flex", justifyContent:'center', marginTop:"10%"}}>
            <div>
                <h2  className="about-title">Немного о нас</h2>
                <div className="about-text"
                    style={{width:'40vw', 
                    backgroundColor:'',
                    color:'black',
                    textAlign:"justify",
                    paddingLeft:"10px",
                    fontSize:'20px',
                    paddingRight:"20px",
                    paddingTop:"20px",
                    paddingBottom:"20px",
                    
                    }}
                >В  Дубраве человек, который устал от 
                бесконечного городского шума, сможет полноценно
                 отдохнуть на лоне природы. Здесь вы убежите от 
                 безликих толп, но в то же время не будете чувствовать
                  себя отшельником. Мы стремились минимально разграничить 
                  территорию каждого коттеджа для того, чтобы вы ощущали 
                  единство с первозданным смешанным лесом, а при желании 
                  познакомились с другими гостями базы отдыха. Здесь не
                   отдыхают плохие люди, потому что для такого времяпрепровождения 
                   нужно обладать изюминкой, которая отличает активных и успешных 
                   людей от безликого большинства.
            </div>
            <div className='about-page-go-to-search'>
                <button className='go-booking about' onClick={() => {
                    window.scrollTo(0, 0);
                    history('/search')}} style={{margin:'auto'}}>
                Выбрать дом</button>
            </div>    
            </div>
            <div className='about-image'>
                <img  src={image} style={{ height:'400px', overflow: 'hidden'}}></img>
            </div> 
            </div>

        <div style={{width:'100%', display:"flex", justifyContent:'center', marginTop:"8%"}} id='about-booking'>   
                <div style={{fontSize:"20px"}}>
                <h2>Бронирование и оплата</h2>
                <p>Бронирование дома можно провести после выбора <b>свободного дома</b>.</p>
                <p>Для начала откройте страницу с <a href={'http://176.196.11.180:3000/'+ 'search'}>поиском</a>
                     , введите данные о проживании и выберите дом</p>

                <LazyImage>
                    <img className='about-lazy-image' src={search} style={{width:'800px', border: 'solid 1px'}}></img>
                </LazyImage>
                    <div className='about-booking-form' style={{display:'flex', marginTop:'5%', justifyContent:'center'}}>
                        <p style={{width:'370px'}}>После того как вы перешли на страницу дома и нажали "Бронировать", <br>
                        </br> вы окажетесь на странице с формой бронироваия
                        <br></br> Далее заполните данные о заказчике и гостях, подтвердите условия обработки персональных 
                        данных и нажмите кнопку "Отправить"
                        <br></br><br>
                        </br><b>Оплата проводится после заселения!</b></p>
                        <LazyImage>
                            <img src={form} style={{height:'400px', border: 'solid 1px'}}></img>
                        </LazyImage>
                    </div>
                 </div>
            </div>

        <div className='rules-h2' style={{width:'100%', height:'100%', display:"flex", justifyContent:'center', marginTop:"3%"}} id='booking-rules'>
                <div style={{fontSize:'20px'}}>
                <h2 style={{marginTop:"70px"}}>Правила проживания</h2>
                <h2 style={{marginTop:'40px', backgroundColor:'#e0e7e3'}}>
                    1 Общие положения</h2>
                <p>1.1. Настоящие правила обязательны для всех гостей базы отдыха.</p>
                <p>1.1. Администрация оставляет за собой право выселить нарушителей без компенсации.</p>
                <h2 style={{marginTop:'40px', backgroundColor:'#e0e7e3'}}>
                    2 Заселение и выселение</h2>
                <p>2.1 Заселение: с 14:00 (возможно раннее заселение за доп. плату).</p>
                <p> Выселение: до 12:00 (продление по согласованию).</p>
                <p>Штраф за потерю ключей - 500 руб</p>
                <h2 style={{marginTop:'40px', backgroundColor:'#e0e7e3'}}>
                    3. Безопасность и порядок</h2>
                <p>Курение — только в специально отведенных местах.</p>
                <p>Запрещено портить имущество (штраф до 100% стоимости ущерба).</p>
                <p>Животные только по согласованию.</p>
                </div>
            </div>
         </div>
    );
}

export default About;
