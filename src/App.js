import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginScreen/login";
import HomePage from "./homePageScreen/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login page */}
        <Route path="/home" element={<HomePage />} /> {/* Homepage */}
      </Routes>
    </Router>
  );
}

export default App;
