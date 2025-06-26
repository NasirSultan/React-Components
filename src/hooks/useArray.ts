import { useState } from 'react';

export function useArray<T>(initial: T[]) {
  const [array, setArray] = useState<T[]>(initial);
  const push = (item: T) => setArray(prev => [...prev, item]);
  const remove = (index: number) => setArray(prev => prev.filter((_, i) => i !== index));
  return { array, push, remove };
}
