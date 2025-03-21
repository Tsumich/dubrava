import React from 'react';

const Pagination = ({bookingPerPage, totalBookings, paginate}) => {
    const pageNumbers = []
    for(let i =1 ; i <= Math.ceil(totalBookings / bookingPerPage); i++){
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul className='pagination'>
                {
                    pageNumbers.map((number, index) => {
                        return (
                            <li className='page-item' key={index}>
                            <a href='#'style={{color:'black'}} className='page-link'  onClick={() => paginate(number)}>
                                {number}
                                
                            </a>
                        </li>
                        )
                        
                    })
                }
            </ul>
        </div>
    );
}

export default Pagination;
