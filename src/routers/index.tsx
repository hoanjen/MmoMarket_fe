import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/auth/index';
import Home from '../pages/home/index';
import Profile from '../pages/profile/index';
import Product from '@pages/product';
import ChatBox from '../pages/chatbox/ChatBox';
import ChatComponent from '@components/chatbox/test';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
      {
        path: '/chat-box',
        element: <ChatBox />,
      },
      {
        path: '/product',
        element: <Product />,
      },
      { path: '/error', element: <Home></Home> },
      { path: '/test', element: <ChatComponent></ChatComponent> },
    ],
  },
  {
    path: '/admin',
    element: <div style={{ color: 'red' }}>Hello world!</div>,
  },
]);
