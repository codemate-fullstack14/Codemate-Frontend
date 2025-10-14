import { Outlet } from "react-router-dom";
import Header from "./header";

function LayoutContainer() {
  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default LayoutContainer;
