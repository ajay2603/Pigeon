import React, { useState } from "react";

function SearchBar(props) {
  const [serVal, setSerVal] = useState("");
  const handleSearch = (event) => {
    setSerVal(event.target.value);
    props.onSearch(event.target.value);
  };

  return (
    <div className="bg-white flex w-full p-3 gap-3 rounded-2xl shadow-md shadow-blue-200">
      <span className="material-symbols-outlined text-2xl">search</span>
      <input
        placeholder="Search"
        value={serVal}
        onChange={handleSearch}
        className="w-full text-xl font-medium outline-none"
      />
    </div>
  );
}

export default SearchBar;
