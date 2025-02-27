import './assets/styles/App.css';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from './components/header/PageHeader';
import { ToastContainer } from 'react-toastify';
import { socket } from './socket';
import { useEffect } from 'react';
import { Footer } from '@components/footer/Footer';

function App() {
  const location = useLocation();
  // useEffect(() => {
  //   socket.connect();
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);
  return (
    <div className="App ">
      <ToastContainer></ToastContainer>
      <header className="flex flex-row z-50 bg-white items-center drop-shadow outline-2 h-16 fixed top-0 left-0 w-full">
        <PageHeader></PageHeader>
      </header>
      <div className={'mt-24 ' + (location.pathname === '/product' ? '' : '')}>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
