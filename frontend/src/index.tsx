import React from 'react';
import ReactDOM from 'react-dom/client';
import PageWrapper from './components/globals/PageWrapper';
import './index.css';
import { router } from './routes/Router';
import { RouterProvider } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PageWrapper>
      <RouterProvider router={router}/>
    </PageWrapper>
  </React.StrictMode>
);
