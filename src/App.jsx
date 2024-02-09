import React, { useState, useEffect, } from "react";
import axios from 'axios'
import List from "./components/List";
import Search from "./components/Search";
import UserDetails from "./components/UserDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyContext } from "./MyContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <List />
  },
  {
    path: '/user/:userId',
    element: <UserDetails />
  },
])

function App() {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>

      <MyContext.Provider value={
        {
          searchText, setSearchText,
          currentPage, setCurrentPage,
          postsPerPage, setPostsPerPage,
          posts, setPosts,
          users, setUsers,
          loading, setLoading,
        }}>
        <RouterProvider router={router}>
          <List />
          <Search />
        </RouterProvider>
      </MyContext.Provider>


    </div>
  );
}

export default App;

