import React from 'react';
import '../css/index.css';

import {
  createBrowserRouter,
} from "react-router-dom";

import Root, {loader as rootLoader} from './Root';
import Index, {loader as streamLoader} from './Index';
import ErrorElement from '../components/ErrorElement';
import Login, {action as loginAction} from './Login';
import Register, {action as registerAction} from './Register';
import StreamData, {loader as streamInitLoader, action as streamInitAction} from './StreamData';
import ChannelData, {loader as channelDataLoader, action as channelDataAction} from './ChannelData';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorElement/>,
    loader: rootLoader,
    children: [
      { index: true, element: <Index />, loader: streamLoader, errorElement: <ErrorElement/>},
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
        element: <StreamData />,
        loader: streamInitLoader,
        action: streamInitAction,
        errorElement: <ErrorElement/>
      },
      {
        path: "user-data",
        element: <ChannelData />,
        loader: channelDataLoader,
        action: channelDataAction,
        errorElement: <ErrorElement/>
      },
    ],
  },
]);