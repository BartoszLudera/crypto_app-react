import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchField() {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="bg-button text-btnText items-center flex flex-row px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl">
      <FaSearch />
      <input
        className="bg-transparent px-2"
        type="text"
        placeholder="Search..."
        style={{ color: "black" }}
        value={searchText}
        onChange={handleInputChange}
      />
    </div>
  );
}
