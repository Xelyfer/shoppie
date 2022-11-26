import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

import { DispatchContext, ACTIONS } from "../App";
// import { DispatchContext, StateContext, ACTIONS } from "../App";

function ProductCard({ product }) {
  const dispatch = useContext(DispatchContext);
  // const state = useContext(StateContex);

  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `https://xelyfer-shoppie-server.onrender.com/record/${product._id}`
        )
        .then((res) => {
          if (parseInt(res.data.stock) > 0) {
            setIsAvailable(true);
          } else {
            setIsAvailable(false);
          }
        });
    }

    fetchData();
  }, [product._id]);

  return (
    <div className="product-card">
      <img src={product?.images[0]} alt="" />
      <h4>{product.name}</h4>
      <p>{product?.description[0]}</p>
      <p>${product.price}</p>
      <p>Remaining: {product.stock}</p>
      <button
        className={
          isAvailable
            ? "button box-shadow-white"
            : "button disable-button box-shadow-white"
        }
        onClick={() => {
          if (isAvailable) {
            dispatch({
              type: ACTIONS.ADD_TO_CART,
              product: product,
              quantity: 1,
            });
          }
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
