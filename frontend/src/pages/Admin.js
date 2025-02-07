import React from 'react';
import Booking from '../components/Booking';
import Ending from '../components/Ending';
import { Button } from 'react-bootstrap';

const Admin = () => {
    return (
        <div>
            <div className='admin-page-title'>
                <div className='admin-page-info'>
                    <div>Добрый вечер, Игорь</div>
                    <div>15:40</div>
                </div>
                <div className='admin-page-btns'>
                    <div> <Button type='button' className='button-more'>Бронирования</Button></div>
                    <div> <Button type='button' style={{float:"right"}} className='button-more'>Заявки</Button></div>
                </div>
            </div>
            <Booking showingEnd={true}/>
            <Booking showingEnd={false}/>
        </div>
    );
}

export default Admin;
