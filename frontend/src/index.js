import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
  redirect,

} from "react-router-dom";

import Root, {loader as rootLoader} from './Root';
import Streams, {loader as streamLoader} from './Streams';
import ErrorElement from './ErrorElement';
import LoginPage, {action as loginAction} from './LoginPage';
import RegisterPage, {action as registerAction} from './RegisterPage';
import InitStream, {loader as streamInitLoader} from './InitStream';

import {logout} from './utils.js';

//TODO: this is bad
async function logoutLoader(){
  await logout();
  throw redirect("/");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorElement/>,
    loader: rootLoader,
    children: [
      { index: true, element: <Streams />, loader: streamLoader, errorElement: <ErrorElement/>},
      {
        path: "login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "stream-init",
        element: <InitStream />,
        loader: streamInitLoader,
      },
      {
        path: "logout",
        loader: logoutLoader
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);