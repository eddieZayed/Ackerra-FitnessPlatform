import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage  from "./auth/LoginPage"; 
import NotFoundPage from "./UI/pages/NotFoundPage";
import Root from "./layout/Root";
import Home from "./UI/pages/Home";
import ContactUsPage from "./UI/pages/ContactUs";
import Register from "./auth/RegisterPage";
import { ToastContainer } from "react-toastify";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>, // Use Root layout
    children: [
      { path: "/", element: <Home/>}, // Home page route
      { path: "/login", element: <LoginPage /> }, // Login page route
      { path: "/signup", element: <Register/> }, // Login page route
      { path:"/contact", element: <ContactUsPage/>}, //Contact us page route
      { path: "/*", element: <NotFoundPage/> }, // Optional: Catch-all route for 404
    ],
  },
]);

const App: React.FC = () => {
  return (
        <>
        <RouterProvider router={router} />
        <ToastContainer />
        </>
  );
};

export default App;
