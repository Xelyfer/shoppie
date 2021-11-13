import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import Cart from "./Cart";

import { Link } from "react-router-dom";

import { ACTIONS, DispatchContext } from "../App";

function Header() {
  const dispatch = useContext(DispatchContext);

  return (
    <div className="header flex-row flex-center">
      <Link to="/">
        <h1
          className="center-text margin-all-1rem hover-border"
          onClick={() => {
            dispatch({ type: ACTIONS.INSTANTIATE_PRODUCT_TO_SHOW });
          }}
        >
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
