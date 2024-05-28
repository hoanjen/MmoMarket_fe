import "./assets/styles/App.css";
import { Outlet } from "react-router-dom";
import PageHeader from "./components/header/PageHeader";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App px-20">
      <ToastContainer></ToastContainer>
      <header className="flex flex-row bg-white items-center drop-shadow outline-2 h-16 fixed top-0 left-0 w-full px-10">
        <PageHeader></PageHeader>
      </header>

      <Outlet />
    </div>
  );
}

export default App;
