import React from "react";
import SearchBar from "./SearchBar";
import Cart from "./Cart";

import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header flex-row flex-center">
      <Link to="/">
        <h1 className="center-text margin-all-1rem hover-border">
          S H O P P I E
        </h1>
      </Link>
      <SearchBar />
      <Link to="/checkout">
        <Cart />
      </Link>
    </div>
  );
}

export default Header;
