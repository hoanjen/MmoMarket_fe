import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/auth/index';
import Home from '../pages/home/index';
import Profile from '../pages/profile/index';
import Product from '@pages/product';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: '/profile/:id',
        element: <Profile/>,
      },
      {
        path: '/product',
        element: <Product/>,
      },
    ],
  },
  {
    path: '/admin',
    element: <div style={{ color: 'red' }}>Hello world!</div>,
  },
]);
