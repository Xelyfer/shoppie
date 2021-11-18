import React, { useContext } from "react";

import { DispatchContext, StateContext, ACTIONS } from "../App";

function ProductCard({ product }) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  return (
    <div className="product-card flex-column flex-center">
      <img src={product?.images[0]} alt="image" />
      <h4>{product.name}</h4>
      <p>{product?.description[0]}</p>
      <p>${product.price}</p>
      <p>Remaining: {product.stock}</p>
      <button
        className="button box-shadow-white"
        onClick={() =>
          dispatch({ type: ACTIONS.ADD_TO_CART, product: product, quantity: 1 })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
