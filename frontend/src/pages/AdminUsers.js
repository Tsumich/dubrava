import React, { useEffect, useLayoutEffect } from 'react';
import Sidebar from '../components/Sidebar';
import CreateUser from '../components/modal/CreateUser';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllUsers } from '../axios';

const AdminUsers = () => {
    const [createUser, setCreateUser] = useState(false)
    const [users, setUsers] = useState()
    const [isLoading, setIsLoading] = useState(true);
        
    useEffect(() => {
        const getData = async() => {
            await getAllUsers().then((data) => setUsers(data.data)).then(setIsLoading(false))
        }
        getData()
    }, []);

    return (
        <div>
            <Sidebar/>
            <CreateUser show={createUser} onHide={() => setCreateUser(false)}></CreateUser>
        
            <div className='admin-tables'>
                <div style={{paddingLeft: '30px', paddingTop:'20px'}}>
                    <h1 className='admin-table-title'>Пользователи </h1>
                    <Button className='booking-admin-create' onClick={() => setCreateUser(true)}>Создать пользователя</Button>    
                </div>
                
                <table className="table">
                    <thead>
                        <tr className='booking-table'>
                        <th scope="col">Имя пользователя</th>
                        <th scope="col">Роль</th>
                        </tr> 
                        {users?.map((user) => {
                            return(
                            <tr className='booking-table'>
                                <td>
                                    {user?.login}
                                </td>
                                <td>
                                    {user?.role}
                                </td>
                            </tr>)
                        })} 
                    </thead>
                    <tbody>

                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default AdminUsers;
