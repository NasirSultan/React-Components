import React, { useState, startTransition, useTransition } from 'react';

export default function Example() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [isPending, startLocalTransition] = useTransition();

  function handleInput(e) {
    const value = e.target.value;
    setText(value); // urgent update

    // Global background update (no loading shown)
    startTransition(() => {
      const globalList = Array.from({ length: 10000 }, (_, i) => `${value} - Global ${i}`);
      setList(globalList);
    });

    // Local transition with loading feedback
    startLocalTransition(() => {
      const localList = Array.from({ length: 30000 }, (_, i) => `${value} - Local ${i}`);
      setList(localList);
    });
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <input
        value={text}
        onChange={handleInput}
        placeholder="Type here..."
        style={{ padding: '0.5rem', width: '100%' }}
      />

      {isPending && <p style={{ color: 'orange' }}>Updating list in background...</p>}

      <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {list.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}
