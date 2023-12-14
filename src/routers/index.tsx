import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Auth from "../pages/auth/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <Auth></Auth>,
      },
    ],
  },
  {
    path: "/admin",
    element: <div style={{ color: "red" }}>Hello world!</div>,
  },
]);
