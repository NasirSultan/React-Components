import React, { useState } from "react";
import Calculator from "./components/Calculator";
import User from "./components/UserList";

export default function App() {
  const [view, setView] = useState("calc");

  return (
    <div>
      <button onClick={() => setView("calc")}>Calculator</button>
      <button onClick={() => setView("user")}>User</button>

      {view === "calc" ? <Calculator /> : <User />}
    </div>
  );
}