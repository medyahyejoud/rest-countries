// import { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

export default function Search(props) {
  return (
    <div className="search-form">
      <AiOutlineSearch size={22} />
      <input
        type="search"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
        placeholder="Search for a country"
      />
    </div>
  );
}
