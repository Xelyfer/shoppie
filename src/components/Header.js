import React from "react";
import SearchBar from "./SearchBar";
import Cart from "./Cart";

function Header() {
  return (
    <div className="header flex-row flex-center">
      <h1 className="center-text margin-all-1rem hover-border">
        S H O P P I E
      </h1>
      <SearchBar />
      <Cart />
    </div>
  );
}

export default Header;
