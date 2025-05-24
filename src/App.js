import React from "react";
import { CustomThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginScreen/login";
import HomePage from "./homePageScreen/homePage";
import TopBar from "./components/TopBar";

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
