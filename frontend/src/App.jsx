import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { Signup } from "./components/Signup";
import {ShortenUrl} from "./components/ShortenUrl";
import {Dashboard} from "./components/DAshboard/DashBoard";
import { PageNotFound } from "./components/PageNotFound";
import HomePage from "./components/HomePage";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <HomePage/>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup/>
      </div>
    ),
  },
  {
    path: "/shortUrl",
    element: (
      <div>
        <ShortenUrl/>
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <Dashboard/>
      </div>
    ),
  },
  {
    path : "*",
    element : <div>
      <PageNotFound/>
    </div>
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
