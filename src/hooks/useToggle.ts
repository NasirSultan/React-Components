import { useState } from 'react';

export default function useToggle(initial: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initial);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
}
