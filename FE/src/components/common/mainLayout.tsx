import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4">
      this is main layout for all page
      <Outlet />
    </div>
  );
};

export default MainLayout;
