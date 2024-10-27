import './assets/styles/App.css';
import { Outlet, useLocation } from 'react-router-dom';
import PageHeader from './components/header/PageHeader';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  return (
    <div className="App ">
      <ToastContainer></ToastContainer>
      <header className="flex flex-row z-50 bg-white items-center drop-shadow outline-2 h-16 fixed top-0 left-0 w-full px-10">
        <PageHeader></PageHeader>
      </header>
      <div className={'mt-24 ' + (location.pathname === '/product' ? '' : 'px-60')}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
