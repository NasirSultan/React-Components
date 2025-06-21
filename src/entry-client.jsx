import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import helmetPkg from 'react-helmet-async';
import App from './App';

const { HelmetProvider } = helmetPkg;

hydrateRoot(
  document.getElementById('root'),
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
