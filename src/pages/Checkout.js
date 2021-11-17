import React, { useContext } from "react";

import { ACTIONS, DispatchContext, StateContext } from "../App";
import ShoppingCartList from "../components/ShoppingCartList";
import Subtotal from "../components/Subtotal";
import Payment from "../components/PaymentForm";

function Checkout() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const { cart } = state;

  return (
    <div className="checkout flex-row">
      <ShoppingCartList />
      <div className="checkout-proceed flex-column flex-center">
        <Subtotal />
        {cart.length === 0 ? <p>Your Shopping Cart is Empty</p> : <Payment />}
      </div>
    </div>
  );
}

export default Checkout;
