// src/features/counter/CounterTest.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Counter from './Counter';

const CounterTest = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default CounterTest;
