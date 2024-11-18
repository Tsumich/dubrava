import React from 'react';
import { useSelector } from 'react-redux';
import Room from './Room';
import line from '../static/line.png'


const Rooms = ({rooms}) => {
    const [activePhotos, setActivePhotos] = []

    const isRoomLoading = rooms.status === 'loading'
    const roomEmpty = {
        title: '',
        price: ''
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
            {(isRoomLoading ? [...Array(5)] : rooms).map((room, index) =>  //использует массив анд-ов если не будет постов
                isRoomLoading ? ( // загрузился ли пост?
            <Room key={index} room={roomEmpty} isLoading={true} /> // пока пост не подгрузилсся рендерится скелет
            ) : (<Room   key={index} room={room}/>))
            }
                
            
        </div>
    );
}

export default Rooms;
