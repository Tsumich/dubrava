import React from 'react';
import { useSelector } from 'react-redux';
import Room from './Room';
import line from '../static/line.png'
import RoomSkelet from './RoomSkelet'

const Rooms = ({rooms}) => {
    const [activePhotos, setActivePhotos] = []

    const isRoomLoading = rooms.status == 'loading'
    const roomEmpty = {
        id: '222',
        title: '',
        price: '',
        image : {
            id: '33'
        }
    }

    return (
        <div>      
            <div className='search-title'> 
            <div>
                <img className='search-line' src={line}></img>
            </div>    
            <div className='search-line'>
                Бронирование
            </div>    
            <div>
                <img className='search-line' src={line}></img>
            </div>    
            </div>   
            {console.log(roomEmpty)}
            {(isRoomLoading ? [...Array(5)] : rooms).map((room, index) =>  //использует массив анд-ов если не будет постов
                isRoomLoading ? ( // загрузился ли пост?
            < ></> // пока пост не подгрузилсся рендерится скелет
            ) : (<Room   key={index} room={room}/>))
            }
                
            
        </div>
    );
}

export default Rooms;
