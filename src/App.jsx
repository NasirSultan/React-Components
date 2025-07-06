import { useState, useCallback } from "react";
import { Product } from "./Product";

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((item) => {
    setCart((prev) => [...prev, item]);
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((p) => (
        <Product key={p.id} product={p} addToCart={addToCart} />
      ))}
      <p>Items in cart: {cart.length}</p>
    </div>
  );
}
