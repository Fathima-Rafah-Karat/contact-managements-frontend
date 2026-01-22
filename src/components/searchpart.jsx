import React, { useState } from "react";

const Search = ({ search, setSearch, setActiveTab }) => {
  const [selectedButton, setSelectedButton] = useState(""); 

  const handleClick = (tab) => {
    setActiveTab(tab);
    setSelectedButton(tab); 
  };

  return (
  <div className="bg-white rounded-lg p-4 mx-4 md:mx-12 mb-10 border border-gray-200
                flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  {/* Search */}
  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2 w-full md:flex-1">
    <img src="search.svg" alt="search" className="w-5 h-5" />
    <input
      className="w-full bg-transparent outline-none text-sm md:text-base"
      type="text"
      placeholder="Search Contacts by name, email, phone-number"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* Buttons */}
  <div className="flex gap-3 w-full md:w-auto
                justify-center md:justify-end
                overflow-x-auto md:overflow-visible">

    
    {/* All */}
    <button
      className={`rounded-2xl px-4 py-2 text-sm md:text-base whitespace-nowrap ${
        selectedButton === "All"
          ? "bg-red-400 text-white"
          : "bg-gray-100 hover:bg-red-400"
      }`}
      onClick={() => handleClick("All")}
    >
      All
    </button>

    {/* Active */}
    <button
      className={`rounded-2xl px-4 py-2 text-sm md:text-base whitespace-nowrap ${
        selectedButton === "Active"
          ? "bg-green-400 text-white"
          : "bg-gray-100 hover:bg-green-400"
      }`}
      onClick={() => handleClick("Active")}
    >
      Active
    </button>

    {/* Month */}
    <button
      className={`rounded-2xl px-4 py-2 text-sm md:text-base whitespace-nowrap ${
        selectedButton === "Month"
          ? "bg-yellow-400 text-white"
          : "bg-gray-100 hover:bg-yellow-400"
      }`}
      onClick={() => handleClick("Month")}
    >
      Month
    </button>

  </div>
</div>

  );
};

export default Search;

