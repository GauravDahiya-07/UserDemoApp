
import React, { useContext } from 'react';
import SearchBar from './SearchBar';
import { MyContext } from "../MyContext";

const Search = () => {

    const { searchText } = useContext(MyContext);

    return (
        <div>
            <SearchBar />
            <p>Search Text: {searchText}</p>
        </div>

    );
};

export default Search;
