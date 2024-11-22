import React, { useContext } from "react";
import { IoMdSearch } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";

const SearchBar = ({ onSearch }) => {
  const { search, setSearch } = useContext(ShopContext);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(search); // Passes the current search input to the parent component for filtering
  };

  return (
    <div className="flex items-center w-full max-w-md mx-auto p-4">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Que cherchez-vous?"
        className="w-full px-4 py-2 border border-gray-300 rounded-l-full outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSearch}
        className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-r-full hover:bg-orange-600"
      >
        <IoMdSearch className="text-lg text-white" />
      </button>
    </div>
  );
};

export default SearchBar;
