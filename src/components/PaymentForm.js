import React, { useContext, useState } from "react";
import axios from "axios";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { getCartTotal, StateContext } from "../App";

function PaymentForm() {
  const state = useContext(StateContext);
  const { cart } = state;

  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const amount = getCartTotal(cart) * 100;
        const response = await axios.post(
          "http://localhost:5000/create-session-payment",
          {
            amount,
            id,
          }
        );

        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
      setIsDisabled(false);
    }
  };

  return (
    <div className="payment flex-column flex-center">
      {!success ? (
        <form className="payment-form flex-column" onSubmit={handleSubmit}>
          <fieldset>
            <div className="payment-element">
              <CardElement></CardElement>
            </div>
          </fieldset>
          <div className="flex-column flex-center">
            <button className="button box-shadow-white" disabled={isDisabled}>
              {!isDisabled ? "Buy Products" : "Checking Card"}
            </button>
          </div>
        </form>
      ) : (
        <h2>Purchase Successful</h2>
      )}
    </div>
  );
}

export default PaymentForm;
