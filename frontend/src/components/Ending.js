import React from 'react';
import Booking from './Booking';

const Ending = () => {
    return (
        <div className='admin-page-ending'>
            <div style={{marginTop:"40px"}}>Проживание подходит к концу</div>
            <Booking showingEnd={true}/>
            {/* {<div className='table-end'>        
        <table class="table" 
                style={{fontSize:"18px",
                    marginTop:"15px"

                }}>
            <thead>
                <tr>
                <th scope="col">Комната</th>
                <th scope="col">Дата заезда</th>
                <th scope="col">Дата выезда</th>
                <th scope="col">Оплачено</th>
                </tr>  
            </thead>
            <tbody>
            <tr>
                <th scope="col">
                    <div className='admin-table-line'></div>
                </th>
                <th scope="col">
                    <div className='admin-table-line'></div>
                </th>
                <th scope="col">
                    <div className='admin-table-line'></div>
                </th>
                <th scope="col">
                    <div className='admin-table-line'></div>
                </th>
                </tr>
                <tr>
                <th scope="col">f</th>
                <th scope="col">dfgdfg</th>
                <th scope="col">dfgdfg</th>
                <th scope="col">dfgdfg</th>
                </tr>
            </tbody>
        </table>
    

      
        </div> */}
        }
        </div>
    );
}

export default Ending;
