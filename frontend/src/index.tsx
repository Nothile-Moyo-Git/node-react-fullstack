import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { nestedRouter } from './routes/Router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={nestedRouter}/>
  </React.StrictMode>
);
