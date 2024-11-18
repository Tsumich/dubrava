import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import line from '../static/line.png'
import { Button } from 'react-bootstrap';
import { getBooking, getRoom } from '../redux/slices';
import { setRoom } from '../redux/slices';

const RoomPage =  () => {
    const navigate = useNavigate()
    let {id}= useParams()
    const dispatch = useDispatch()
    const {rooms} = useSelector(state => state.rooms)
    const room =  useSelector(getRoom)
    const booking =  useSelector(getBooking)
    const [loading, setLoading] = useState(true)
    const [currentRoom, setCurrentRoom] = useState()

    let meels = []

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
            
            <div className='room-page-bg-image'>
                <img src={`http://localhost:9000/${room.image[2].image}`}/>    
            </div>

            <div className='room-info-container'>
                <div className='room-page-image-info'>
                    <img src={`http://localhost:9000/${room.image[2].image}`}/>
                </div>

                <div className='room-page-info' style={{marginBottom:'20px'}}>
                <div className='room-page-info-bg'></div>
                    <div className='room-page-title'>
                        <h3>{room.title}</h3>
                    </div>
                    <div className='room-page-title-line'>
                        <img src={line} style={{width:"150px", height:'25px'}}/>
                    </div>
                
                    <div className='room-page-desc'>
                        
                        <p >{room.info}</p>
                    </div>
                    <div className='room-page-meals-title'>
                        <h4 style={{textAlign:'center', marginBottom:'30px'}}>В стоимость входит</h4 >

                    </div>
                    <div className='room-page-meels'>
                        <ul>
                        {room.meel.split(";").map((meel) => {
                            console.log(meels)
                            return <li>{meel}</li>
                        })}
                        </ul>
                    </div>
                    {booking ?
                        <p style={{marginTop:"40px", float:'right', fontSize:'19px'}}>
                        Стоимость проживания за {booking.days} суток {room.price * booking.days} руб
                        </p>
                        :
                        <p style={{marginTop:"40px", float:'right', fontSize:'19px'}}>
                        Стоимость проживания за сутки {room.price} руб
                        </p>
                    }           

                    <div className='go-to-booking'>
                        {booking ?
                        <Button onClick={() => navigate('/booking')}>Перейти к бронированию</Button>
                        :
                        <Button onClick={() => navigate('/search')}>Выбрать дом</Button>}
                        </div>
                </div>

            </div>
            </div>                
        </div>
    );
}

export default RoomPage;
