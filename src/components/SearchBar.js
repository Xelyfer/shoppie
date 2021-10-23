import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar() {
  return (
    <div className="search-bar flex-row">
      <input type="text" />
      <button className="padding-all">
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
