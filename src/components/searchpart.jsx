import React, { useState } from "react";

const Search = ({ search, setSearch, setActiveTab }) => {
  const [selectedButton, setSelectedButton] = useState(""); 

  const handleClick = (tab) => {
    setActiveTab(tab);
    setSelectedButton(tab); 
  };

  return (
    <div className="bg-white h-25 rounded-lg p-2 ml-12 mr-12 mb-10 flex justify-between border border-gray-200">
      {/* Search  */}
      <div className="bg-gray-100 m-5 rounded-lg p-3 flex items-center gap-2 w-full ">
        <img src="search.svg" alt="search" />
        <input
          className="w-full bg-transparent outline-none"
          type="text"
          placeholder="Search Contacts by name, email, phone-number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* All Button */}
      <button
        className={`rounded-2xl p-3 m-5 ${
          selectedButton === "All"
            ? "bg-red-400 text-white" // active color
            : "bg-gray-100 hover:bg-red-400"
        }`}
        onClick={() => handleClick("All")}
      >
        All
      </button>

      {/* Active Button */}
      <button
        className={`rounded-2xl p-3 m-5 ${
          selectedButton === "Active"
            ? "bg-green-400 text-white"
            : "bg-gray-100 hover:bg-green-400"
        }`}
        onClick={() => handleClick("Active")}
      >
        Active
      </button>

      {/*  Month Button */}
      <button
        className={`rounded-2xl p-3 m-5 ${
          selectedButton === "Month"
            ? "bg-yellow-400 text-white"
            : "bg-gray-100 hover:bg-yellow-400"
        }`}
        onClick={() => handleClick("Month")}
      >
        Month
      </button>
    </div>
  );
};

export default Search;

