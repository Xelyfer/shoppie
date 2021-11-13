import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { ACTIONS } from "../App";
import { StateContext, DispatchContext } from "../App";

function SearchBar() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <div className="search-bar flex-row">
      <input
        type="text"
        onChange={(e) =>
          dispatch({ type: ACTIONS.SEARCH, value: e.target.value })
        }
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            dispatch({ type: ACTIONS.UPDATE_PRODUCT_TO_SHOW });
          }
        }}
        value={state.search}
      />
      <button
        className="padding-all"
        onClick={() => {
          dispatch({ type: ACTIONS.UPDATE_PRODUCT_TO_SHOW });
        }}
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
