import React, { useContext } from "react";

import { ACTIONS, DispatchContext, StateContext } from "../App";
import Subtotal from "./Subtotal";

function ShoppingCartList() {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const { cart } = state;

  return (
    <div className="shopping-cart-list flex-column">
      {cart.length === 0 ? (
        <h1>Your Shopping Cart is Empty</h1>
      ) : (
        <div>
          <h1>Shopping Cart</h1>
          <hr />
          <div>
            {cart.map((item, key) => {
              return (
                <div key={key} className="shopping-cart-list-item flex-row">
                  <img src={item.product?.images[0]} alt=""></img>
                  <div>
                    <h4>{item.product?.name}</h4>
                    <div className="shopping-cart-list-item-quantity flex-row">
                      <p>Quantity: {item.quantity}</p>
                      <a
                        href
                        onClick={() => {
                          dispatch({
                            type: ACTIONS.DELETE_FROM_CART,
                            product: item.product,
                          });
                        }}
                      >
                        Delete
                      </a>
                    </div>
                    <p>Price: ${item.product?.price * item.quantity}</p>
                  </div>
                </div>
              );
            })}
            <hr />
            <Subtotal />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartList;
