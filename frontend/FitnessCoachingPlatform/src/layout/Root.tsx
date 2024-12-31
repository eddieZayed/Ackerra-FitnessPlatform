import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import GlobalNavbar from "../UI/components/GlobalNavbar";

const Root: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Show the GlobalNavbar only if the current path is not "/" */}
      {location.pathname !== "/" && <GlobalNavbar />}
      <Outlet />
    </>
  );
};

export default Root;
