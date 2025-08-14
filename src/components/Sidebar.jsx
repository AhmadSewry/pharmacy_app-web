import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import {
  BarChartOutlined,
  CalendarTodayOutlined,
  HomeOutlined,
  Logout,
  PeopleAltOutlined,
  PersonOutline,
  PieChartOutlineOutlined,
  ReceiptOutlined,
} from "@mui/icons-material";
import LocalShipping from "@mui/icons-material/LocalShipping";
import { Avatar } from "@mui/material";
import loginImage from "../screens/loginScreen/assets/images/loginImage.jpg";
import { useThemeContext } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import Sales from "../screens/sales/Sales";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) }
    : { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme) }),
}));

const cookies = new Cookies();

export default function Sidebar({ open, handleDrawerClose }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode } = useThemeContext();

  // ✅ قراءة الدور من التخزين المحلي وتحويله لحروف صغيرة
  const role = localStorage.getItem("role")?.toLowerCase();
  console.log("Current role:", role);

  // ✅ القائمة الأساسية
  const menuItems = [
    { text: "Dashboard", icon: <HomeOutlined />, path: "/home" },
    ...(role === "admin"
      ? [{ text: "Manage Team", icon: <PeopleAltOutlined />, path: "/team" }]
      : []),
    {
      text: "Manage Suppliers",
      icon: <LocalShipping />,
      path: "/manageSuppliers",
    },
    { text: "Invoices Balances", icon: <ReceiptOutlined />, path: "/invoices" },
  ];

  const secondaryItems = [
    { text: "Profile Form", icon: <PersonOutline />, path: "/form" },
    { text: "Calendar", icon: <CalendarTodayOutlined />, path: "/calendar" },
    {
      text: "Purshase Page",
      icon: <AttachMoneyIcon sx={{ fontSize: 30 }} />,
      path: "/purshase",
    },
  ];

  const chartItems = [
    { text: "Bar Chart", icon: <BarChartOutlined />, path: "/bar" },
    { text: "Pie Chart", icon: <PieChartOutlineOutlined />, path: "/pie" },
    { text: "Sales", icon: <PointOfSaleIcon />, path: "/sales" },
    { text: "Logout", icon: <Logout />, action: handleLogout },
  ];

  async function handleLogout() {
    try {
      const token = localStorage.getItem("token");
      await axios.get("http://localhost:5200/api/Account/logout", {
        headers: { Authorization: "Bearer " + token },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Avatar
          sx={{
            mx: "auto",
            width: open ? 80 : 50,
            height: open ? 80 : 50,
            transition: "1s",
            mt: 1,
            my: 1,
            border: "2px gray",
          }}
          alt="Remy Sharp"
          src={loginImage}
        />
        <Typography
          align="center"
          sx={{ fontSize: open ? 15 : 0, transition: "1s" }}
        >
          Ahmed
        </Typography>
        <Typography
          align="center"
          sx={{
            fontSize: open ? 13 : 0,
            transition: "1s",
            color: theme.palette.info.main,
          }}
        >
          {role}
        </Typography>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: mode === "dark" ? "gold" : "green",
                  }}
                  style={{ paddingRight: "12px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {secondaryItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: mode === "dark" ? "gold" : "green",
                  }}
                  style={{ paddingRight: "12px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {chartItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigate(item.path);
                  }
                }}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: mode === "dark" ? "gold" : "green",
                  }}
                  style={{ paddingRight: "12px" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
