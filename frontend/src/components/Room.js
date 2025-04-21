import React, { useRef } from 'react';
import Image from "react-bootstrap/Image";
 import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom } from '../redux/slices';
import { isAuthSelector } from '../redux/slicesAuth';

const Room  = ({room}) => {
    const [mainImage, setMainImage] = useState(room.image[0].image)
    const [activePhoto, setActivePhoto] = useState(room.image[0].id)
    const dispatch = useDispatch()
    const changeImage = (index, id) => {
          setMainImage(room.image[index].image)
          setActivePhoto(id)
    }
    let guestAmount = Array.from({length: room.guest_amount}, (_, i) => i); 
 
     const mainPhotoPath = `http://localhost:9000/${mainImage}`
     const history = useNavigate()

    const {data} = useSelector(state => state.auth)
     const role = data==null? 'USER' : data.role

     const goToRoomPage = () =>{
        window.scrollTo(0, 0)
        dispatch(setRoom(room))
        history('/room/' + room.id)
     }

    const info = useRef('')
    info.current = room.info ? room.info.substr(0, 123) + ' ...' : ''
     
    return (
        <div className='room-in-search'>
            
             <div className='room-photos'>    
                {
                <Image className='room-main-photo' src={`http://176.196.11.180:9000/${mainImage}`}></Image> 
                }     

                <div className='bg-image'></div>
                <div className='room-other-photo'>
                    
                    <Image onClick={()=>{changeImage(0, room.image[0].id)}} 
                            className={activePhoto == room.image[0].id? 'rooms-image-active':'rooms-image' }
                            width={90} 
                            height={80} 
                            style={{border:'50px'}}
                            src={`http://176.196.11.180:9000/${room.image[0].image}`}></Image>

                      
                    <Image onClick={()=>{changeImage(1, room.image[1].id)}} 
                            className={activePhoto == room.image[1].id? 'rooms-image-active':'rooms-image' }
                            width={90} 
                            height={80} 
                            src={`http://176.196.11.180:9000/${room ? room.image[1].image : ""}`}></Image>
                    
                    
                    <Image onClick={(e)=>{changeImage(2, room.image[2].id)}}
                            className={activePhoto == room.image[2].id? 'rooms-image-active':'rooms-image' }
                            width={90} 
                            height={80} 
                            src={`http://176.196.11.180:9000/${room.image[2].image}`}></Image>
                </div>
            </div>

            <div className='room-info'>
                <div style={{marginLeft:'20px', marginRight:"20px", height:"95%", position:"relative"}}>
                    <div className='room-title'>{room.title } </div>  
                    <div className='room-short-info'>
                      {info.current}
                          </div>  
                    <div className='room-price'>
                        <div>  
                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" 
                            style={{marginRight:"10px"}}
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 6H42M42 6V18M42 6L28 20M18 42H6M6 42V30M6 42L20 28" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Площадь: {room.area} кв.м
                            <div className='guest-icon'>
                                { 
                                guestAmount.map((i) => {
                                    return (<svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M40 42V38C40 35.8783 39.1571 33.8434 37.6569 32.3431C36.1566 30.8429 34.1217 30 32 30H16C13.8783 30 11.8434 30.8429 10.3431 32.3431C8.84285 33.8434 8 35.8783 8 38V42M32 14C32 18.4183 28.4183 22 24 22C19.5817 22 16 18.4183 16 14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14Z" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>)
                                    
                                })}
                            </div>
                             
                        </div>  
                        <div>
                             
                        </div>
                    </div>
                    <div className='buttons-more-container' style={{display:'flex'}}>
                    <Button type='button' className='button-more' onClick={() => goToRoomPage()}> Подробнее</Button>
                { //role == 'ADMIN' ? <Button type='button' className='button-edit' style={{marginLeft:'10px'}} onClick={() => goToRoomPage()}> </Button>
                //: <></>
                } 
                        <svg width="24" height="24"
                            style={{marginLeft:"10px", marginRight:"10px", alignSelf:'center'}} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42 4L38 8M38 8L44 14L37 21L31 15M38 8L31 15M22.78 23.22C23.8127 24.2389 24.6336 25.4521 25.1955 26.7896C25.7574 28.1271 26.0492 29.5625 26.0541 31.0133C26.0589 32.464 25.7768 33.9014 25.2238 35.2426C24.6709 36.5838 23.8581 37.8025 22.8323 38.8283C21.8065 39.8541 20.5878 40.6669 19.2466 41.2198C17.9054 41.7728 16.468 42.0549 15.0173 42.0501C13.5665 42.0452 12.1311 41.7534 10.7936 41.1915C9.45608 40.6296 8.24293 39.8087 7.224 38.776C5.22026 36.7014 4.11152 33.9228 4.13659 31.0386C4.16165 28.1544 5.31851 25.3955 7.358 23.356C9.39748 21.3165 12.1564 20.1596 15.0406 20.1346C17.9248 20.1095 20.7034 21.2183 22.778 23.222L22.78 23.22ZM22.78 23.22L31 15" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                             <div style={{alignSelf:'center'}}>Цена за сутки: {room.price } руб.</div>
                    </div>
                        
                    </div>
                        
            </div>  
        </div>
    );
}

export default Room;
