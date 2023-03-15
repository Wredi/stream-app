import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './Root';
import Streams, {loader as streamLoader} from './Streams';
import ErrorElement from './ErrorElement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      { index: true, element: <Streams />, loader: () => streamLoader(), errorElement: <ErrorElement/>},
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);