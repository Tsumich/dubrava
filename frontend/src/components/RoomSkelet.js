import React from 'react';
import Image from "react-bootstrap/Image";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRoom } from '../redux/slices';

const RoomSkelet  = ({room}) => {
    console.log('sdfsdfdf')
    const [mainImage, setMainImage] = useState(room.image[0].image)
    const [activePhoto, setActivePhoto] = useState(room.image[0].id)
    const dispatch = useDispatch()
    const changeImage = (index, id) => {
          setMainImage(room.image[index].image)
          setActivePhoto(id)
  
     }
     const mainPhotoPath = `http://localhost:9000/${mainImage}`
     const history = useNavigate()


     console.log(room.image)
     const goToRoomPage = () =>{
        dispatch(setRoom(room))
        history('/room/' + room.id)
     }
    return (
        <div className='room-in-search'>
            <div className='room-photos'>    
                {
                <Image className='room-main-photo' src={`http://localhost:9000//${mainImage}`}></Image> 
                }     

                <div className='bg-image'></div>
                <div className='room-other-photo'>
                    
                    <Image onClick={()=>{changeImage(0, room.image[0].id)}} 
                            className={activePhoto == room.image[0].id? 'rooms-image-active':'rooms-image' }
                            width={90} 
                            height={80} 
                            style={{border:'50px'}}
                            ></Image>

                      
                    <Image onClick={()=>{changeImage(1, room.image[1].id)}} 
                            className={activePhoto == room.image[1].id? 'rooms-image-active':'rooms-image' }
                            width={90} 
                            height={80} 
                            src={`http://localhost:9000//${room.image[1].image}`}></Image>
                    
                    
                    <Image onClick={(e)=>{changeImage(2, room.image[2].id)}}
                            className={activePhoto == room.image[2].id? 'rooms-image-active':'rooms-image' }
                            width={90} 
                            height={80} 
                            src={`http://localhost:9000//${room.image[2].image}`}></Image>
                </div>
            </div>

            <div className='room-info'>
                <div className='room-title'>{room.title } </div>  
                <div style={{marginLeft:'20px', marginRight:"20px"}}>
                    <div className='room-short-info'>{room.info } </div>  
                    <div className='room-price'>Цена за сутки: {room.price } руб.</div>  
                    <Button type='button' className='button-more' onClick={() => goToRoomPage()}> Подробнее</Button>
                </div>
                 
            </div>  
        </div>
    );
}

export default RoomSkelet;
