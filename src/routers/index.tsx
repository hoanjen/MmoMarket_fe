import App from '../App';
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../pages/auth/index';
import Home from '../pages/home/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/auth',
        element: <Auth></Auth>,
      },
    ],
  },
  {
    path: '/admin',
    element: <div style={{ color: 'red' }}>Hello world!</div>,
  },
]);
