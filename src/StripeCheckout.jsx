import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Replace with your Stripe test public key
const stripePromise = loadStripe("pk_test_51Reg7tHHJOFCG0ibR2gKOVwxMy13tBzVsXWrh0XiLt7SsA3l6QrpbxFYgRV8rbgzszmBs3R8EzhVeSGk6LK9LiHf00FY9FcTNc");

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeCheckout;
