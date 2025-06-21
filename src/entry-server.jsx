import React from 'react';
import { renderToString } from 'react-dom/server';
import helmetPkg from 'react-helmet-async';
import App from './App';

const { HelmetProvider } = helmetPkg;

export function render() {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    html,
    head: helmet.title.toString() + helmet.meta.toString(),
  };
}
