import React, { useState } from 'react';
import Modal from './components/Modal';
import './index.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <h1>React Portal Example</h1>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Hello from the Modal!</h2>
          <p>This content is rendered outside the DOM tree.</p>
        </Modal>
      )}
    </div>
  );
}

export default App;
