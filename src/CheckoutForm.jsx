import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount");
      return;
    }

    try {
      const response = await fetch("http://localhost:4242/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }

      const { clientSecret } = await response.json();

      const card = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment succeeded! 🎉");
        setAmount("");
        elements.getElement(CardElement).clear();
      }
    } catch (err) {
      setMessage(err.message);
      console.error(err);
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6 transition-all duration-300"
>
  <h2 className="text-2xl font-bold text-gray-800 text-center">
    Stripe Test Payment
  </h2>

  {/* Amount Field */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Amount (USD)
    </label>
    <input
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="10.00"
      min="0"
      step="0.01"
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
    />
  </div>

  {/* Card Details */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Card Details
    </label>
    <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-150">
      <CardElement className="p-1 cursor-pointer" />
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={!stripe}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Pay
  </button>

  {/* Message */}
  {message && (
    <p className="text-sm text-gray-600 mt-2 text-center">{message}</p>
  )}
</form>


  );
}
