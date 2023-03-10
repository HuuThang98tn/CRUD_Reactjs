import React from 'react'
import Pagination from 'react-bootstrap/Pagination';


const AdvancedPagination = ({ postsPerPage, totalPosts, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a

                            onClick={(event) => {
                                event.preventDefault()
                                paginate(number)
                            }
                            } href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav >

    )
}

export default AdvancedPagination