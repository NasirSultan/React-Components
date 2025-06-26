import React from "react";
import { FixedSizeList as List } from "react-window";

export default function App() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

  return (
    <div className="App" style={{ padding: 20 }}>
      <h2>Virtualized List (react-window)</h2>
      <List
        height={400}          // Viewport height in pixels
        itemCount={items.length}
        itemSize={35}         // Height of each item (in px)
        width={300}           // Width of the list container
      >
        {({ index, style }) => (
          <div style={style}>
            {items[index]}
          </div>
        )}
      </List>
    </div>
  );
}
