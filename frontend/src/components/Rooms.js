import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Room from './Room';
import line from '../static/line.png'

const Rooms = ({rooms}) => {
    const [isRoomLoading, setIsRoomLoading] = useState(rooms.status == 'loading')
    const roomsStatus = useSelector(state => state?.rooms?.rooms?.status)
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
            {!rooms ? 
            <div className='spinner-room-loading'>
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div></div>
                  : rooms.map((room, index) =>
              (<Room   key={index} room={room}/>)
            ) 
              
            }
                
            
        </div>
    );
}

export default Rooms;

// {(isRoomLoading ? [...Array(5)] : rooms).map((room, index) =>  //использует массив анд-ов если не будет постов
//     isRoomLoading ? ( // загрузился ли пост?
// < >
//     <div class="spinner-grow" role="status">
//         <span class="visually-hidden">Loading...</span>
//     </div>
// </> // пока пост не подгрузилсся рендерится скелет
// ) : (<Room   key={index} room={room}/>))
// }


// {!isRoomLoading ? 
             
//     rooms.map((index, room)=> <Room   key={index} room={room}/>)
//          :
//         <div class="spinner-grow" role="status">
//             <span class="visually-hidden">Loading...</span>
//         </div>
//     }