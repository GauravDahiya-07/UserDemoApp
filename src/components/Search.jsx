
import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import { SearchContext } from '../App'

const Search = () => {
   
    const contextValue = useContext(SearchContext);

    if (!contextValue) {
        // Handle the case where contextValue is undefined
        console.error('SearchContext is not properly provided.');
        return null;
    }

    const {searchText, setSearchText } = useContext(SearchContext);
    console.log('Render Search with searchText:', searchText);
    return (
            <div>
                <SearchBar />
                <p>Search Text: {searchText}</p>
            </div>
        
    );
};

export default Search;