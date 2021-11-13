import React, { useContext } from "react";

import Create from "../components/Create";
import ProductList from "../components/ProductList";

import { StateContext, DispatchContext, ACTIONS } from "../App";

function Home() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const { isToggledCreate, isLoading, productData, cart } = state;

  return (
    <div className="home flex-column flex-center">
      <div
        className="button flex-center box-shadow-white"
        onClick={() => {
          dispatch({ type: ACTIONS.TOGGLE_CREATE });
        }}
      >
        {isToggledCreate ? "Close" : "Create New Product"}
      </div>
      {isToggledCreate ? <Create /> : null}
      <ProductList />
    </div>
  );
}

export default Home;
