import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage  from "./auth/LoginPage"; 
import NotFoundPage from "./UI/pages/NotFoundPage";
import Root from "./layout/Root";
import Home from "./UI/pages/Home";
import ContactUsPage from "./UI/pages/ContactUs";
import Register from "./auth/RegisterPage";
import { ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/UserContext";
import ClientWelcomePage from "./Users/ClientUser/ClientWelcomePage";
import ClientServicesPage from "./Users/ClientUser/ClientServicesPage";
import BmiCalculatorPage from "./Users/ClientUser/Services/BmiCalculatorPage";
import CalorieCalculatorPage from "./Users/ClientUser/Services/CalorieCalculatorPage";
import BodyCompositionCalculator from "./Users/ClientUser/Services/BodyCompositionCalculator";
import SupplementsRecommendationPage from "./Users/ClientUser/Services/SupplementsRecommendationPage";
import CaloriesBurnedCalculator from "./Users/ClientUser/Services/CaloriesBurnedCalculator";
import BehaviorChangePage from "./Users/ClientUser/Services/BehaviorChangePage";
import ChatbotPage from "./Users/ClientUser/Services/ChatbotPage";
import ExercisesPage from "./Users/ClientUser/Services/ExercisesPage";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>, // Use Root layout
    children: [
      { path: "/", element: <Home/>}, // Home page route
      { path: "/login", element: <LoginPage /> }, // Login page route
      { path: "/signup", element: <Register/> }, // Login page route
      { path:"/contact", element: <ContactUsPage/>}, //Contact us page route
      { path:"/clienthome", element: <ClientWelcomePage/>}, //clientWelcomePage
      { path:"/clientservices", element: <ClientServicesPage/>},
      //services links
      { path:"/bmi-calculator", element: <BmiCalculatorPage/>},
      { path:"/calories-calculator", element: <CalorieCalculatorPage/>},
      { path:"/body-composition-calculator", element: <BodyCompositionCalculator/>},
      { path:"/supplements-recommendations", element: <SupplementsRecommendationPage/>},
      { path:"/calories-burned-calculator", element: <CaloriesBurnedCalculator/>},
      { path:"/behavior-change-tool", element: <BehaviorChangePage/>},
      { path:"/chatbot", element: <ChatbotPage/>},
      { path:"/exercises", element: <ExercisesPage/>},
      

      
      { path: "/*", element: <NotFoundPage/> }, // Optional: Catch-all route for 404
    ],
  },
]);

const App: React.FC = () => {
  return (
        <UserContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserContextProvider>
  );
};

export default App;
