import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import { useThemeContext } from "../ThemeContext"; // ✅ import theme context

const MainLayout = () => {
  const [open, setOpen] = React.useState(false);
  const { mode } = useThemeContext(); // ✅ get theme mode

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div>
      <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <div
        className="main"
        style={{
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff", // ✅ dynamic background
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
