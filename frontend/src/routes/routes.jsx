import React from 'react';
import '../css/index.css';

import {
  createBrowserRouter,
} from "react-router-dom";

import Root, {loader as rootLoader} from './Root';
import Streams, {loader as streamLoader} from './Streams';
import ErrorElement from '../components/ErrorElement';
import Login, {action as loginAction} from './Login';
import Register, {action as registerAction} from './Register';
import InitStream, {loader as streamInitLoader, action as streamInitAction} from './InitStream';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorElement/>,
    loader: rootLoader,
    children: [
      { index: true, element: <Streams />, loader: streamLoader, errorElement: <ErrorElement/>},
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "stream-init",
        element: <InitStream />,
        loader: streamInitLoader,
        action: streamInitAction,
        errorElement: <ErrorElement/>
      },
    ],
  },
]);