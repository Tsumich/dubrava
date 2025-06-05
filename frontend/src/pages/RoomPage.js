import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import line from '../static/line.png'
import { Button } from 'react-bootstrap';
import { getBooking, getRoom } from '../redux/slices';
import { setRoom } from '../redux/slices';
import LazyImage from '../components/LazyImage';
import { getPhoto } from '../axios';

const RoomPage =  () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
   
    const navigate = useNavigate()
    let {id}= useParams()
    const dispatch = useDispatch()
    const {rooms} = useSelector(state => state.rooms)
    const room =  useSelector(getRoom)
    const booking =  useSelector(getBooking)
    const [loading, setLoading] = useState(true)
    const [currentRoom, setCurrentRoom] = useState()

    let meels = []
    const URL = 'https://dubrava789.onrender.com/'
    //const URL = 'http://176.196.11.180:9000/'
 
    if(!loading && room){
        if(loading && room.meels){
            meels = room.meels.split(";")
            setCurrentRoom(room)
        }

    }else if(loading && !currentRoom){
        rooms.items.map((tempRoom) => {
            if(id == tempRoom.id){
                dispatch(setRoom(tempRoom))
                setLoading(false)
            } 
        })
    }

    return (
        loading ? 
            <div>loading ... </div> :
            
            <div className='wr-room-page'>
                
            <div className='room-page'>
                <div className='room-page-line'></div>
        

            <div className='room-info-container'>
                <div className='room-page-bg-image'>
                    <img src={`${URL}${room?.image[0]?.image}`}/>    
                </div>
                 
                <div className='room-page-image-info'>
                    <img src={`${URL}${room?.image[0]?.image}`}/>
                </div>

                <div className='room-page-info' style={{marginBottom:'20px'}}>
                    <div className='room-info-banner'>
                        <h2>{room.title}</h2>
                    </div>
                <div className='room-page-info-bg'></div>
                    <div className='room-page-title'>
                        {booking ?
                        <p style={{marginTop:"40px", textAlign:'center', fontSize:'19px'}}>
                        Стоимость проживания за {booking.days} сут. {room.price * booking.days} руб
                        </p>
                        :
                        <p style={{marginTop:"40px", textAlign:'center', fontSize:'19px'}}>
                        Стоимость проживания за сутки {room.price} руб
                        </p>}
                    </div>
                    <div className='room-page-title-line'>
                        <img src={line} style={{width:"150px", height:'25px'}}/>
                    </div>
                
                    <div className='room-page-desc'>
                        <p >{room.info}</p>
                    </div>
      

                    <div className='go-to-booking'> 
                        {booking ?
                        <button className='go-booking' 
                            onClick={() => navigate(`/room/${room.id}/booking`)}
                            >
                            Перейти к бронированию</button>
                        :
                        <button className='go-booking' onClick={() =>  navigate(-1)}>Выбрать дом</button>}
                    </div>
                </div>

            </div>

            <div className='room-page-title-line'>
                <img src={line} style={{width:"150px", height:'25px'}}/>
            </div>
            <div className='room-meel-wr'> 
                <div style={{margin:'auto', marginTop:"20px", marginRight:"0"}}> 
            <LazyImage> 
                <div className='room-page-meals-title'>
                    <h4>В стоимость входит</h4 >
                </div>
                <div className='room-page-meels'>
                    <ul>
                        {room.meel.split(";").map((meel) => {
                            return <li>{meel}</li>
                        })}
                    </ul>
                </div>
            </LazyImage>

            <div> 
            <div style={{marginTop:'50px'}} className='benefits-list'> 
                {room.benefits.split(";").map((benefit) => {
                    return <div className='benefits'>{benefit}</div>
                })}
            </div>
            <div style={{marginTop:'20px'}}>
                <div className='button-go-booking' style={{textAlign:'center'}}>
                    {booking ?
                    <button  className='go-booking' onClick={() => navigate(`/room/${room.id}/booking`)} style={{margin:'auto'}}>
                        Забронировать</button>
                        :
                    <button className='go-booking' onClick={() => navigate(-1)} style={{margin:'auto'}}>
                        Выбрать дом</button>}
                </div>
            </div>
            </div>
                  
            </div>
               <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel"
                 style={{width:"650px",marginRight: '4%', marginLeft: '60px'}}>
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        
                                 <div class="carousel-item active">
                                    <img src={`${URL}${room?.image[1]?.image}`} class="d-block w-100 h-400" style={{height:'400px'}} alt="..."/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>{room?.image[1]?.title}</h5>
                                        <p>{room?.image[1]?.info}</p>
                                    </div>
                                    </div>
                                
                                    <div class="carousel-item">
                                    <img src={`${URL}${room?.image[2]?.image}`} class="d-block w-100" style={{height:'400px'}} alt="..."/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>{room?.image[2]?.title}</h5>
                                        <p>{room?.image[2]?.info}</p>
                                    </div>
                                    </div>   
                                    
                                    <div class="carousel-item">
                                    <img src={`${URL}${room?.image[3]?.image}`} class="d-block w-100" style={{height:'400px'}} alt="..."/>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>{room?.image[3]?.title}</h5>
                                        <p>{room?.image[3]?.info}</p>
                                    </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>  
            </div>      
 </div>
         </div>
    );
}

export default RoomPage;

//**
// 
// <div style={{width:'100%'}} className='banner-room'>
{/* <div className='room-info-banner'>
<h2>{room.title}</h2>
</div>
<div className='room-page-images-banner'>
<img src={`${URL}${room?.image[0]?.image}`} 
    style={{height:'480px'}}/>
<div className='room-page-images-column-images'>
    <img src={`${URL}${room?.image[0]?.image}`} 
        style={{height:'160px'}}/>
    <img src={`${URL}${room?.image[0]?.image}`} 
        style={{height:'160px'}}/>
    <img src={`${URL}${room?.image[0]?.image}`} 
        style={{height:'160px'}}/>
</div>

</div>
        
<div className='line' style={{marginTop:"50px"}}></div>

</div> */}
//  */