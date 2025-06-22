// src/hooks/useYourHook.js
import { useState, useEffect } from 'react';

function useYourHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log('Value changed to:', value);
  }, [value]);

  const updateValue = (newVal) => {
    setValue(newVal);
  };

  return { value, updateValue };
}

export default useYourHook;
