import React from "react";
import { CustomThemeProvider } from "./ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/loginScreen/login";
import ManageTeam from "./screens/manageTeam/ManageTeam";
import Contacts from "./screens/contacts/Contacts";
import Invoices from "./screens/invoices/Invoices";
import ProfileForm from "./screens/profileForm/ProfileForm";
import Calendar from "./screens/calendar/Calendar";
import Faq from "./screens/FAQ/FAQ";
import BarChart from "./screens/barChart/BarChart";
import PieChart from "./screens/pieChart/PieChart";
import LineChart from "./screens/lineChart/LineChart";
import MainLayout from "./components/mainLayout";
import HomePage from "./screens/homePage/HomePage";

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="form" element={<ProfileForm />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="faq" element={<Faq />} />
            <Route path="bar" element={<BarChart />} />
            <Route path="pie" element={<PieChart />} />
            <Route path="line" element={<LineChart />} />
          </Route>
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;
