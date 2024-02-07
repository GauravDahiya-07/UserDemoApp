import React, { useState } from "react";
import List from "./components/List";
import Search from "./components/Search";
import UserDetails from "./components/UserDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MyContext } from "./MyContext";
function App() {
  const [searchText, setSearchText] = useState("Test");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MyContext.Provider value={{ searchText, setSearchText }}>
                <List />
                <Search />
              </MyContext.Provider>
            }
          />
          <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
