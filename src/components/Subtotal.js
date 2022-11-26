import React, { useContext } from "react";
// import React, { useContext, useEffect, useState } from "react";

import { StateContext, getCartTotal } from "../App";

function Subtotal() {
  const state = useContext(StateContext);
  const { cart } = state;

  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
  });

  return (
    <div className="subtotal flex-row">
      <span>
        {`Subtotal (${quantity} ${quantity > 1 ? "items" : "item"}):`}
      </span>
      <span>${getCartTotal(cart)} NZD</span>
    </div>
  );
}

export default Subtotal;
