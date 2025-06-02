import React from 'react';
import Booking from './Booking';

const Ending = () => {
    return (
        <div className='admin-page-ending'>
            <div style={{marginTop:"40px"}}>Проживание подходит к концу</div>
            <Booking showingEnd={true}/>
        </div>
    );
}

export default Ending;
