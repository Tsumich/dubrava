import React , {useMemo, useState, useEffect} from 'react';
import { useTable } from 'react-table'
import { getBooking, getEnd } from '../axios';
import Note from './Note';
import Pagination from './Pagination';
import { Button } from 'react-bootstrap';
import CreateBooking from './modal/CreateBooking';


const Booking =  ({showingEnd}) => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [bookingPerPage] = useState(10)

    const [createBooking, setCreateBooking] = useState(false)

    useEffect(() => {
        const getData = async() => {
            setLoading(true)
            !showingEnd ? await getBooking().then((data)=> {
                console.log(data)
                setBookings(data)
            setLoading(false)
            }) : await getEnd().then((data)=> {
                console.log(data)
                setBookings(data)
            setLoading(false)
            })


        }
        getData()
    }, []) 

    
    let lastBookingIndex = currentPage * bookingPerPage
    const firstBookingIndex = lastBookingIndex - bookingPerPage
    const currentBooking = bookings.slice(firstBookingIndex, lastBookingIndex)
    
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    return (
    <div className='admin-tables'>
       <div className='container mt-5'>
        <h1 className='admin-table-title'>{showingEnd ? 'Проживание подходит к концу' : 'Бронирование домов'} </h1>
        <div> {!showingEnd ? <Button  onClick={() => setCreateBooking(true)}>Создать бронь</Button> : <></>} </div>
        
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Комната</th>
                    <th scope="col">Дата заезда</th>
                    <th scope="col">Дата выезда</th>
                    <th scope="col">Оплачено</th>
                    </tr>  
                </thead>
                <tbody>
                    {currentBooking.map(booking => {
                    return(
                        <Note booking={booking} loading={loading} checkPaid={showingEnd}/>
                    ) 
                    })}
                        
                </tbody>
            </table>
        

            <Pagination 
                bookingPerPage={bookingPerPage} 
                totalBookings={bookings.length}
                paginate={paginate}/>

        </div>

        <CreateBooking show={createBooking} onHide={() => setCreateBooking(false)}></CreateBooking>
        
    </div> 
    );
}

export default Booking;

{/* <ul>
{
currentBooking.map((booking, i) => {
   return (
    <li key={i} className='list-group-item'>
        <Note booking={booking} loading={loading}/>
    </li>
   )
    
}) 
}
</ul> */}