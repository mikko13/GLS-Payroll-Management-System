import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PayrollDashboard from "./pages/PayrollComponents/PayrollDashboardComponent";
import LoginPage from "./pages/LoginComponents/LoginComponent"
import HomeDashboard from "./pages/DashboardComponents/HomeComponent"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<HomeDashboard />} />
        <Route path="/Payroll" element={<PayrollDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
