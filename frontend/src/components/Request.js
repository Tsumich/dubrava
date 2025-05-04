import React , {useMemo, useState, useEffect} from 'react';
import { useTable } from 'react-table'
import { getRequest} from '../axios';
import Note from './Note';
import Pagination from './Pagination';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Request = () => {
    const [request, setRequest] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [bookingPerPage] = useState(5)

    const navigate = useNavigate()

    if(!useSelector(state => state.auth)) navigate('/')

    useEffect( () => {
        console.log('useEffect request')
        const getData = async() => {
         await getRequest().then((data)=> {
            setRequest(data)
            console.log(data)
            setLoading(false)
        })}
        getData()
    }, []) 

    console.log('request')
    let lastBookingIndex = currentPage * bookingPerPage
    const firstBookingIndex = lastBookingIndex - bookingPerPage
    const currentBooking = request.slice(firstBookingIndex, lastBookingIndex)
    
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    return (<><Sidebar/> 
    <div className='admin-tables'>
         
       <div className='container mt-5'>
        <h1 className='admin-table-title'>Заявки на бронирование </h1>
        
            <table className="table" >
                <thead>
                    <tr className='booking-table'>
                    <th scope="col">Комната</th>
                    <th scope="col">Дата заезда</th>
                    <th scope="col">Дата выезда</th>
                    <th scope="col">Имя клиента</th>
                    <th scope="col">Номер клиента</th>
                    <th scope="col">Действие</th>
                    </tr>  
                </thead>
                <tbody>
                    {currentBooking.map(request => {
                    return(
                        <Note booking={request} loading={loading} isRequest={true}/>
                    ) 
                    })}
                        
                </tbody>
                <Pagination
                bookingPerPage={bookingPerPage} 
                totalBookings={request.length}
                paginate={paginate}/>
            </table>

        </div>
    </div> </>
    );
}

export default Request;
