import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51JvEMoFY4bKZy24wPj9Xqegi0QPgrc4WIcGFbM22fIP53ZLeFFp1AiX3lziLeH0sQDMyW704XmQdbcLcK3pzS47m00mtXOt1xV";

const stripePromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
