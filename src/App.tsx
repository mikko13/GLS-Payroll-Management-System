import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PayrollDashboard from "./pages/PayrollComponents/PayrollDashboardComponent";
import LoginPage from "./pages/LoginComponents/LoginComponent";
import HomeDashboard from "./pages/DashboardComponents/Dashboard";
import EmployeeDashboard from "./pages/EmployeeComponents/EmployeeDashboard";
import NotFoundPage from "./pages/NotFoundPageComponents/NotFoundPage";
import SettingsPage from "./pages/SettingsComponents/SettingsPage";
import CreatePayrollForm from "./pages/PayrollComponents/CreatePayrollComponents/CreatePayrollForm";
import CreateEmployeeForm from "./pages/EmployeeComponents/CreateEmployeeComponents/CreateEmployeeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Dashboard" element={<HomeDashboard />} />
        <Route path="/Payroll" element={<PayrollDashboard />} />
        <Route path="/Employees" element={<EmployeeDashboard />} />
        <Route path="/Settings" element={<SettingsPage />} />

        <Route path="/Payroll/CreatePayroll" element={<CreatePayrollForm />} />
        <Route path="/Employees/AddEmployee" element={<CreateEmployeeForm />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
