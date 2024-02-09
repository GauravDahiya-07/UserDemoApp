import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from "../MyContext";
import Pagination from './Pagination';
import Spinner from './Spinner';


function UserDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentPage, setCurrentPage, postsPerPage, posts, setPosts } = useContext(MyContext);
    const navigate = useNavigate();

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            const UserData = response.data.find((user) => user.id == userId);
            setUser(UserData);
            fetchPosts(UserData.id);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async (userId) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        setCurrentPage(1);
        navigate(-1);
    }

    return (
        loading ? (
            < Spinner />
        ) : (
            <div className='flex flex-col items-start justify-center min-h-screen mx-4 my-4 bg-gray-100'>
                <button
                    className='flex items-center space-x-2 bg-gray-500 px-2 py-2 mx-2 my-1 text-m rounded-md  font-bold'
                    onClick={handleBackClick}
                >
                    <span>Back</span>
                    <span >&larr;</span>

                </button>
                {user && (
                    <div>
                        <h1 className='text-6xl font-bold text-purple-500 mx-4 my-2'>{user.name}</h1>
                        <h2 className='text-4xl font-bold text-yellow-400 mx-4 my-2'> Posts</h2>
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
                        <div>
                            <Pagination />
                        </div>
                    </div>
                )}
            </div>
        ));
}

export default UserDetails;

