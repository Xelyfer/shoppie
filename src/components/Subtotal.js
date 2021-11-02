import React, { useContext, useEffect, useState } from "react";

import { StateContext } from "../App";

function Subtotal() {
  const state = useContext(StateContext);
  const { cart } = state;

  const [subtotal, setSubtotal] = useState(0);

  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
  });

  useEffect(() => {
    let subtotal = 0;
    cart.map((item) => {
      subtotal += item.product?.price * item.quantity;
    });
    setSubtotal(subtotal);
  }, [cart]);

  return (
    <div className="subtotal flex-row">
      <span>
        {`Subtotal (${quantity} ${quantity > 1 ? "items" : "item"}):`}
      </span>
      <span>${subtotal.toLocaleString()}</span>
    </div>
  );
}

export default Subtotal;
