import "./assets/styles/App.css";
import { Outlet } from "react-router-dom";
import DialogAuth from "../src/components/auth/auth";
import PageHeader from "./components/header/PageHeader";

function App() {
  return (
    <div className="App px-20">
      <header className="flex flex-row bg-white items-center drop-shadow outline-2 h-16 fixed top-0 left-0 w-full px-10">
        <PageHeader></PageHeader>
      </header>
      <DialogAuth />
      <Outlet />
    </div>
  );
}

export default App;
