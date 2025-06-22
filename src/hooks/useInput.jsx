// src/hooks/useInput.js
import { useState } from 'react';

function useInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return {
    value,
    onChange,
    reset,
    bind: {
      value,
      onChange,
    },
  };
}

export default useInput;
