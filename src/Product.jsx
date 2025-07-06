import React from "react";

export const Product = React.memo(({ product, addToCart }) => {
  console.log("Rendering:", product.name);
  return (
    <div style={{ padding: "10px", border: "1px solid gray" }}>
      <h3>{product.name}</h3>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
});
