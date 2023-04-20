import React from 'react';
import '../css/index.css';

import {
  createBrowserRouter,
  Navigate
} from "react-router-dom";

import Root, {loader as rootLoader} from './Root';
import Index, {loader as streamLoader} from './Index';
import ErrorElement from '../components/ErrorElement';
import Login, {action as loginAction} from './Login';
import Register, {action as registerAction} from './Register';
import StreamData, {loader as streamInitLoader, action as streamInitAction} from './StreamData';
import ChannelData, {loader as channelDataLoader, action as channelDataAction} from './ChannelData';
import StreamPage, {loader as streamPageLoader} from './StreamPage';
import UserPanel from './UserPanel';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorElement/>,
    loader: rootLoader,
    children: [
      { index: true, element: <Index />, loader: streamLoader, errorElement: <ErrorElement/>},
      {
        path: "stream/:username",
        element: <StreamPage />,
        loader: streamPageLoader,
      },
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
        path: "user",
        element: <UserPanel/>,
        errorElement: <ErrorElement/>,
        children: [
          { index: true, element: <Navigate to="channel" />, errorElement: <ErrorElement/>},
          {
            path: "channel",
            element: <ChannelData/>,
            loader: channelDataLoader,
            action: channelDataAction,
            errorElement: <ErrorElement/>
          },
          {
            path: "stream",
            element: <StreamData />,
            loader: streamInitLoader,
            action: streamInitAction,
            errorElement: <ErrorElement/>
          },
        ]
      }
    ],
  },
]);