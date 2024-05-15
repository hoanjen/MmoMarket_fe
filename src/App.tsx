import "./assets/styles/App.css";
import { Outlet } from "react-router-dom";
import DialogAuth from "../src/components/auth/auth";

function App() {
  return (
    <div className="App px-20">
      <header className="flex bg-red-300 outline-2 h-16 justify-end fixed top-0 left-0 w-full px-10 py-2">
        <DialogAuth />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
