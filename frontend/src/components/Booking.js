import React , {useState, useEffect} from 'react';
import { getBooking, getEnd } from '../axios';
import Note from './Note';
import Pagination from './Pagination';
import { Button } from 'react-bootstrap';
import CreateBooking from './modal/CreateBooking';


const Booking =  ({showingEnd}) => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [bookingPerPage] = useState(5)
    const [createBooking, setCreateBooking] = useState(false)
   
    useEffect(() => {
        const getData = async() => {
            setLoading(true)
            !showingEnd ? await getBooking().then((data)=> {
                setBookings(data)
            setLoading(false)
            }) : await getEnd().then((data)=> {
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
       <div className='container mt-5' style={{height:'50vh'}}>
        <h1 className='admin-table-title'>{showingEnd ? 'Проживание подходит к концу' : 'Бронирование домов'} </h1>
        <div> {!showingEnd ? <Button className='booking-admin-create' onClick={() => setCreateBooking(true)}>Создать бронь</Button> : <></>} </div>
           { currentBooking.length > 0 ?
            <table className="table" >
                <thead>
                    <tr className='booking-table'>
                    <th scope="col">Комната</th>
                    <th scope="col">Дата заезда</th>
                    <th scope="col">Дата выезда</th>
                    <th scope="col">Оплачено</th>
                    </tr>  
                </thead>
                <tbody>
                    {currentBooking.map(booking => {
                        return(<Note booking={booking} loading={loading} checkPaid={showingEnd}/>) 
                    })}
                        
                </tbody>
                <Pagination
                bookingPerPage={bookingPerPage} 
                totalBookings={bookings.length}
                paginate={paginate}/>
            </table> : 
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