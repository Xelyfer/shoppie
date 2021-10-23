import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Cart() {
  return (
    <div className="cart flex-row flex-center hover-border margin-all-1rem">
      <div className="flex-column flex-center">
        <span>#</span>
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
