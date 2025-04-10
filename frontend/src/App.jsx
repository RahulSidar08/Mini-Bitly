import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import { Signup } from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Dashboard2 from "./components/DAshboard/DashBoard";
import { PageNotFound } from "./components/PageNotFound";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Dashboard/>
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
    path: "/analytic",
    element: (
      <div>
        <AnalyticsDashboard/>
      </div>
    ),
  },
  {
    path: "/hero",
    element: (
      <div>
        <Dashboard2/>
      </div>
    ),
  },{
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
