import App from '../App';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Auth from '../pages/auth/index';
import Home from '../pages/home/index';
import Profile from '../pages/profile/index';
import Product from '@pages/product';
import ChatBox from '../pages/chatbox/ChatBox';
import OrderHistory from '@pages/orderHistory';
import ChatComponent from '@components/chatbox/test';
import AdminHomePage from '../pages/admin/home';
import { DashboardLayout } from '@components/admin/layouts/dashboard';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { varAlpha } from '@components/admin/theme/styles';
import { Suspense } from 'react';
import { ThemeProvider } from '@components/admin/theme/theme-provider';
import UserPage from '@pages/admin/user';
import ProductPage from '@pages/admin/product';
import ProductDetail from '@pages/productDetail';
import OrderDetail from '@pages/orderDetail';
import BoothManage from '@pages/boothManage';
import CataLogPage from '@pages/admin/catalog';
import TransactionPage from '@pages/admin/transaction';
import DepositHistory from '@pages/depositHistory';
import OrderOfClient from '@pages/orderOfClient';
import Payment from '@pages/deposit';
import PaymentPage from '@pages/admin/payment';
import ReportPage from '@pages/admin/report'
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
      {
        path: '/product-detail/:id',
        element: <ProductDetail />,
      },
      {
        path: '/order-history/:page',
        element: <OrderHistory />,
      },
      {
        path: '/order-detail/:id',
        element: <OrderDetail />,
      },
      {
        path: '/booth-manage',
        element: <BoothManage />,
      },
      {
        path: '/deposit-history',
        element: <DepositHistory />,
      },
      {
        path: '/order-client',
        element: <OrderOfClient />,
      },
      {
        path: '/payment',
        element: <Payment />,
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
    children: [
      { element: <AdminHomePage />, index: true },
      { path: '/admin/user', element: <UserPage /> },
      { path: '/admin/product', element: <ProductPage /> },
      { path: '/admin/catalog', element: <CataLogPage /> },
      { path: '/admin/transaction', element: <TransactionPage /> },
      { path: '/admin/payment', element: <PaymentPage /> },
      { path: '/admin/report', element: <ReportPage/> },
    ],
  },
]);
