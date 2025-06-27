
## Stripe Payment Integration in React (Test Mode)

### Description:

This is a simple **React.js** application that integrates **Stripe's payment system** using their official libraries. The app allows users to:

* Enter a **payment amount**
* Enter **card details**
* Process the payment through **Stripe Test Mode**
* Receive a **success or error message** after submission

It's ideal for testing and learning how to integrate Stripe into your frontend using React.

---

### Tech Stack:

* React.js
* Tailwind CSS (for UI styling)
* @stripe/react-stripe-js (React wrapper for Stripe)
* Stripe Elements for secure card input
* Node.js + Express (backend for creating payment intent)

---

### File Structure Overview:

```bash
.
├── App.js                # Loads Stripe Elements and renders CheckoutForm
├── CheckoutForm.js       # Main payment form UI and logic
└── server.js (backend)   # (Not included here) Create payment intent using Stripe Secret Key
```

---

### How It Works (Frontend):

1. Loads Stripe using your **Publishable Key**.
2. Renders a form with:

   * Input for amount (USD)
   * Stripe CardElement to securely collect card details
3. On submit:

   * Sends amount to backend to create a **PaymentIntent**
   * Receives `clientSecret` from server
   * Uses `stripe.confirmCardPayment()` to confirm and process the payment
   * Shows result message: success or error

---

### To Use This:

1. Replace the empty string in `loadStripe("")` with your **Stripe Publishable Key**

   ```js
   const stripePromise = loadStripe("pk_test_YourKeyHere");
   ```

2. Make sure your backend is running at:

   ```
   http://localhost:4242/create-payment-intent
   ```

   and returns a `clientSecret`.


