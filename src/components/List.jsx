import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import { MyContext } from "../MyContext";
import Spinner from './Spinner';

const List = () => {

    const { loading, users } = useContext(MyContext);

    return (
        loading ? (
            < Spinner />
        ) : (
            <>

                <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
                    <div>
                        <Search />
                    </div>

                    <h1 className='text-4xl font-bold mb-6 text-red-500 p-4'>User List</h1>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className='text-lg font-medium mb-2' >
                                <Link key={user.id}
                                    to={`/user/${user.id}`}
                                    className='text-blue-500 hover:underline'
                                >
                                    {user.name} - {user.username}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
            </>
        ))
}

export default List
