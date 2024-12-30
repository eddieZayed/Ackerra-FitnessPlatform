import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage  from "./auth/LoginPage"; 
import Home from "./UI/HomePage/Home"; 
import NotFoundPage from "./UI/NotFoundPage";
import Root from "./layout/Root";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>, // Use Root layout
    children: [
      { path: "/", element: <Home /> }, // Home page route
      { path: "/login", element: <LoginPage /> }, // Login page route
      { path: "/*", element: <NotFoundPage/> }, // Optional: Catch-all route for 404
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
