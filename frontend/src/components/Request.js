import React , {useMemo, useState, useEffect, useLayoutEffect} from 'react';
import { useTable } from 'react-table'
import { getRequest} from '../axios';
import Note from './Note';
import Pagination from './Pagination';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { isAuthSelector } from '../redux/slicesAuth';

const Request = () => {
    const [request, setRequest] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [bookingPerPage] = useState(5)

    useEffect( () => {
        const getData = async() => {
         await getRequest().then((data)=> {
            setRequest(data)
            setLoading(false)
        })}
        getData()
    }, []) 

    let lastBookingIndex = currentPage * bookingPerPage
    const firstBookingIndex = lastBookingIndex - bookingPerPage
    const currentBooking = request.slice(firstBookingIndex, lastBookingIndex)
    
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    return (<><Sidebar/> 
    <div className='admin-tables'>
         
       <div className='container mt-2'>
        <h1 className='admin-table-title'>Заявки на бронирование </h1>
        
            {request.length > 0 ?
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
                :
            <table className='table-skelet'>
                <thead>
                    <tr className='booking-table'>
                    <th scope="col">Комната</th>
                    <th scope="col">Дата заезда</th>
                    <th scope="col">Дата выезда</th>
                    <th scope="col">Оплачено</th>
                    </tr>  
                </thead>
                <tbody>
                    <tr>
                        <td colspan="4" style={{textAlign:'center', color:'#c8c8cc'}}>Нет данных</td>
                    </tr>    
                </tbody>
            </table>
            }

        </div>
    </div> </>
    );
}

export default Request;
