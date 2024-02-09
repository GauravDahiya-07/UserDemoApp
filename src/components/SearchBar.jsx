import React, { useContext } from "react";
import { MyContext } from "../MyContext";

const SearchBar = () => {
  const { searchText, setSearchText } = useContext(MyContext);

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
  };
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus: ring-2 focus: ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;

