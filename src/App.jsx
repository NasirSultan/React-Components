import { useRef } from "react";

function App() {
  const inputRef = useRef(null);
  const sectionRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Focus & Scroll Example</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Click button to focus me"
        style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleFocus} style={{ marginRight: "10px" }}>
          Focus Input
        </button>
        <button onClick={handleScroll}>Scroll to Section</button>
      </div>

      <div style={{ height: "600px", backgroundColor: "#f5f5f5", marginTop: "40px" }}>
        Scroll down area...
      </div>

      <div
        ref={sectionRef}
        style={{
          height: "100px",
          backgroundColor: "#e0e0e0",
          padding: "20px",
          marginTop: "20px"
        }}
      >
        Target Section
      </div>
    </div>
  );
}

export default App;
