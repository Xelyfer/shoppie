import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { StateContext } from "../App";

function Cart() {
  const state = useContext(StateContext);

  const { cart } = state;

  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
  });

  return (
    <div className="cart flex-row flex-center hover-border margin-all-1rem">
      <div className="flex-column flex-center">
        {quantity > 0 ? (
          <span style={{ color: "orange" }}>{quantity}</span>
        ) : (
          <span>{quantity}</span>
        )}
        <ShoppingCartIcon />
      </div>
      <div className="flex-column flex-center">
        <span></span>
        <span>Cart</span>
      </div>
    </div>
  );
}

export default Cart;
