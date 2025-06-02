import Sidebar from '../components/Sidebar';
import React , {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RoomInfo from '../components/modal/RoomInfo';

const AdminRooms =  () => {
    const {rooms} = useSelector(state => state.rooms)
    const dispatch = useDispatch()
    const roomRef = useRef()
    const navigate = useNavigate()
    if(!useSelector(state => state.auth)) navigate('/')
    const [editInfo, setEditInfo] = useState(false)
    const edit = useRef('')

    return (
    <>
    <Sidebar/>
    <RoomInfo show={editInfo} room={roomRef.current} edit={edit.current}
        onHide={() => setEditInfo(false)}></RoomInfo>
    <div className='admin-tables'>
       <div className='container mt-2' style={{height:'50vh'}}>
        <h1 className='admin-table-title'> Список домов </h1>

        
            <table className="table" >
                <thead>
                    <tr className='booking-table'>
                    <th scope="col">ID</th>
                    <th scope="col">Название</th>
                    <th scope="col">Действия</th>
                    </tr>  
                </thead>
                <tbody>
                    {rooms.items.map((room => {
                        return(
                            <tr style={{textAlign:"center"}}>
                                <td>
                                    {room.id}
                                </td>
                                <td>
                                    {room.title}
                                </td>
                                <td>
                                    <button className='admin-room-action' style={{backgroundColor:'#819b85'}}
                                        onClick={() => {
                                            setEditInfo(true)
                                            edit.current = 'info'
                                            roomRef.current = room
                                        }}
                                        >Информация</button>
                                    <button className='admin-room-action'
                                     style={{backgroundColor:"#888fa8"}}
                                     onClick={() => {
                                            setEditInfo(true)
                                            edit.current = 'image'
                                            roomRef.current = room
                                        }}
                                     >Фотографии</button>
                                </td>
                                
                            </tr>
                        )
                    }))}
                        
                </tbody>
            </table>
        </div>        
    </div> </>
    );
}

export default AdminRooms;
