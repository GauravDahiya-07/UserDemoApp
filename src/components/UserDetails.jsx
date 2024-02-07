import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); 

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        const UserData = response.data.find((user) => user.id == userId);
        setUser(UserData);
        fetchPosts(UserData.id);
    };

    const fetchPosts = async (userId) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        setPosts(response.data);
    };

   
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        {user && (
            <div>
                <h1 className='text-6xl font-bold text-purple-500'>{user.name}</h1>
                <h2 className='text-4xl font-bold text-yellow-400'> Posts</h2>
                <table className='min-w-full border border-gray-300'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b border-gray-300 text-bold font-semibold text-red-400'>
                                Title
                            </th>
                            <th className='py-2 px-4 border-b border-gray-300 text-bold font-semibold text-red-400'>
                                Body
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((post) => (
                            <tr key={post.id}>
                                <td className='py-2 px-4 border-b border-gray-300'>{post.title}</td>
                                <td className='py-2 px-4 border-b border-gray-300'>{post.body}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex items-center justify-center mt-6 space-x-4'>
                        <button
                            className={`bg-green-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <span className='text-xl font-bold'>{currentPage}</span>
                        <button
                            className={`bg-green-500 text-white px-4 py-2 rounded ${currentPage === Math.ceil(posts.length / postsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
