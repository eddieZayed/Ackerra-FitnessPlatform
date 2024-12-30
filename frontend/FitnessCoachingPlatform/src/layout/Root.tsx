
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Outlet /> {/* Renders the matched child route */}
    </>
  );
}
