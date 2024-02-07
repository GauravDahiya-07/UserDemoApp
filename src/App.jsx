import React, {  useState } from 'react'
import List from './components/List'
import Search from './components/Search';
import { createContext } from 'react';

export const SearchContext = createContext();

function App() {

  const [searchText, setSearchText] = useState('');
 
  return (
    <>

      <SearchContext.Provider value={{ searchText, setSearchText }}>
        <List />
        <Search />
      </SearchContext.Provider>
    </>
  )
}

export default App
