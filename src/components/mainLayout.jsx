import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Banner from "../components/Banner";

const MainLayout = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
