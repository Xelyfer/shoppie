import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="search-bar flex-row">
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <button className="padding-all">
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
