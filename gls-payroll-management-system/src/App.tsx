import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PayrollDashboard from "./pages/PayrollComponents/PayrollDashboardComponent";
import LoginPage from "./pages/LoginComponents/LoginComponent"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Payroll" element={<PayrollDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
