import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { App } from 'components/App';
import GlobalCSS from 'global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <GlobalCSS />
    <ToastContainer autoClose={2000} />
  </>
);
