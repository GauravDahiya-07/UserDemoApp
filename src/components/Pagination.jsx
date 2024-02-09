import React, { useContext, useState } from 'react'
import { MyContext } from "../MyContext";

function Pagination() {
    const { currentPage, setCurrentPage, postsPerPage, setPostsPerPage, posts } = useContext(MyContext);
    const [selectedValue, setSelectedValue] = useState(postsPerPage);
    

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleDropdownChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setSelectedValue(newSize);
        setPostsPerPage(newSize);
        paginate(1);
    };
    const startIndex = (currentPage - 1) * postsPerPage + 1;
    const endIndex = Math.min(currentPage * postsPerPage, posts.length);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <div className='flex items-center justify-between mt-6 ml-4 text-gray-600 p-4 text-sm'>
            <div className="flex items-center">
                <span className="mr-1">View:</span>
                <div className="relative inline-block text-left ">
                    <select
                        value={selectedValue}
                        onChange={handleDropdownChange}
                        className=" bg-gray-400 mr-1 text-white leading-tight border border-gray-700 "
                        style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                    <span className="mr-1">Per Page</span>
                </div>
            </div>
            <span>
                viewing {startIndex}-{endIndex} of {posts.length}
            </span>
            <div>
                <span className=' px-2 py-2'>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className={` bg-gray-500 px-2 py-2 font-bold text-m text-black  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                <span className="mx-2"></span>
                <button
                    className={`bg-gray-500 px-2 py-2 font-bold text-m text-black   ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                >
                    &gt;
                </button>


            </div>
        </div>

    )
}

export default Pagination