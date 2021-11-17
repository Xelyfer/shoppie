import React, { useContext, useState } from "react";
import axios from "axios";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { getCartTotal, StateContext } from "../App";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <CardElement></CardElement>
            </div>
          </fieldset>
          <button disabled={isDisabled}>
            {!isDisabled ? "Buy Products" : "Checking Card"}
          </button>
        </form>
      ) : (
        <h2>Purchase Successful</h2>
      )}
    </div>
  );
}

export default PaymentForm;
