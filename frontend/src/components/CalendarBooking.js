import React, { useState } from 'react';
import { getBooking } from '../axios';
import { Button } from 'react-bootstrap';
import check_img from '../static/check.png'
import close from '../static/close.png'
import next from '../static/next.png'
import prev from '../static/prev.png'

const CalendarBooking = ({startDate, rooms}) => {
    const [loading, setLoading] = useState(false)
    const [loadingAllDates, setLoadingAllDates] = useState(false)
    const [result, setResult] = useState([])
    const [tableDates, setTableDated] = useState([])
    let resultForAllRoom = []
    const datesPerPage = 7; // сколько дат в таблице
    let datesArray = [] // массив больших дат
    let dateFormatArray = [] // дата по типу 2024-10-17
    let datesForTable = [] // массив дат типа "5 окт"
    let startDateInPeriod
    let endDateInPeriod
    let mounth = ['янв', "фев", "мар", "апр", "май", "июн", "июл", "авг", "сент", "окт", "нояб", "дек"]
   let globalResult = [] // [ [0-dates], [1-results]]
    if(!startDate) {
        return( 
            <div className='calendar-loading'></div>
        )
    }

    const getDates = (startDate,toNext) => {
        datesArray = [] // большие даты
        dateFormatArray = []
        if(toNext){
            for(let i=0; i <= datesPerPage; i++){
                let dateTemp = new Date(startDate)
                dateTemp.setDate(startDate.getDate() + i);
                dateTemp.setHours(0)
                dateTemp.setMinutes(0)
                dateTemp.setSeconds(0)
                dateTemp.setMilliseconds(0)
                dateFormatArray.push(dateTemp.toLocaleDateString())
                datesArray.push(dateTemp)
        }}else{
            for(let i=datesPerPage; i >= 0; i--){
                let dateTemp = new Date(startDate)
                dateTemp.setDate(startDate.getDate() - i);
                dateTemp.setHours(0)
                dateTemp.setMinutes(0)
                dateTemp.setSeconds(0)
                dateTemp.setMilliseconds(0)
                dateFormatArray.push(dateTemp.toLocaleDateString())
                datesArray.push(dateTemp)  
        } }
        globalResult.push(datesArray)
        return datesArray
    }

const getResult = (startDateInPeriod, endDateInPeriod, datesArray) => {
    let formatDatesArray = []
    for (let i=0; i<= datesPerPage; i++){
        let month = datesArray[i].getDate()
        let day = datesArray[i].getMonth()
        day = mounth[day]
        let dateString = `${month} ${day}`
        formatDatesArray.push(dateString)
    } 
    dateFormatArray.push(formatDatesArray)
    globalResult.push(formatDatesArray)

    let resultForRoom = []
        getBooking(startDateInPeriod, endDateInPeriod).then(data => { 
            rooms.items.map(room => {
            resultForRoom = []
            datesArray.forEach((date) => {
                let check = false
                data.map((booking) => {  
                    let checkIn = new Date(booking.checkIn)
                    let checkOut = new Date(booking.checkOut)
                    checkIn.setHours(0)
                    checkOut.setHours(0)
                    //resultForRoom.push((date >= checkIn) && (date <= checkOut) && (room.id == booking.roomId))
                    if((date >= checkIn) && (date <= checkOut) && (room.id == booking.roomId)) check=true
                })  
                resultForRoom.push(check)  
            })
            resultForAllRoom.push(resultForRoom)
            })
            console.log(resultForAllRoom)
            globalResult.push(resultForAllRoom)
           setResult(globalResult) 
           setLoading(true)
        })
}


const start = (firstLoading, toNext) => {
    if(firstLoading) datesArray = getDates(startDate, toNext)

    if((!firstLoading) && (toNext)) datesArray = getDates(result[0][datesPerPage], toNext)
    if ((!firstLoading) && (!toNext)) datesArray = getDates(result[0][0], toNext)
    startDateInPeriod = datesArray[0]
    endDateInPeriod = datesArray[datesPerPage]
    getResult(startDateInPeriod, endDateInPeriod, datesArray)
}

if (!loading) start(true, true)



    return (
        result.length?
        <div >
            <div className='sorry-msg'>
                Извините, но на выбранный вами период отсутствуют доступные дома...
            </div>
            <table className='table-calendar'>
                <thread className='table-th' >
                    <tr>
                        {result[1].map((date, i) => {
                            return (
                                <td className='result-item' key={i}>{date}</td>
                            )
                        })}
                    </tr>
                    {rooms.items.map((room, i) => {
                    return(
                        <>
                            <tr><td className='room-column' key={i} colSpan={datesPerPage+1}>{room.title}</td></tr>
                            <tr className='result-item-parent'>
                            </tr>   
                            <tr className='result-item'>
                                {result[2][i].map(check => {
                                    //return <td>{check == false? 0: 1}</td>
                                    return <td>
                                        {check == false ? <img src={check_img}/> 
                                                        : <img src={close}/>}
                                    </td>
                                })}
                            </tr>
                        </>
                    )
                    })}
                </thread>
            </table>   
            <Button  className='next-btn' type='button' onClick={() => start(false, true)}>
                <img src={next} style={{width:'50%', height:'50%'}} />
            </Button>
            <Button className='previous-btn' type='button' onClick={() => start(false, false)}>
                <img src={prev} style={{width:'50%', height:'50%'}}/>
            </Button>

        </div>:<div> loading</div>
    );
}

export default CalendarBooking;
