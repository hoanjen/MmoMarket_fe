import App from '../App';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Auth from '../pages/auth/index';
import Home from '../pages/home/index';
import Profile from '../pages/profile/index';
import Product from '@pages/product';
import ChatBox from '../pages/chatbox/ChatBox';
import ChatComponent from '@components/chatbox/test';
import AdminHomePage from '../pages/admin/home';
import { DashboardLayout } from '@components/admin/layouts/dashboard';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from '@components/admin/theme/styles';
import { Suspense } from 'react';
import { ThemeProvider } from '@components/admin/theme/theme-provider';

const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

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
    element: (
      <ThemeProvider>
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ThemeProvider>
    ),
    children:[
      { element: <AdminHomePage />, index: true },
    ]
  },
]);
