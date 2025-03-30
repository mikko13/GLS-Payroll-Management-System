import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PayrollDashboard from "./pages/UserComponents/PayrollComponents/Dashboard";
import LoginPage from "./pages/LoginComponents/LoginComponent";
import HomeDashboard from "./pages/UserComponents/DashboardComponents/Dashboard";
import EmployeeDashboard from "./pages/UserComponents/EmployeeComponents/Dashboard";
import NotFoundPage from "./pages/NotFoundPageComponents/NotFoundPage";
import SettingsPage from "./pages/UserComponents/SettingsComponents/SettingsPage";
import CreatePayrollForm from "./pages/UserComponents/PayrollComponents/CreatePayrollComponents/CreatePayrollForm";
import CreateEmployeeForm from "./pages/UserComponents/EmployeeComponents/CreateEmployeeComponents/CreateEmployeeForm";
import UpdateEmployeeForm from "./pages/UserComponents/EmployeeComponents/UpdateEmployeeComponents/UpdateEmployeeForm";
import UpdatePayrollForm from "./pages/UserComponents/PayrollComponents/UpdatePayrollComponents/UpdatePayrollForm";

import AdminPayrollDashboard from "./pages/AdminComponents/PayrollComponents/Dashboard";
import AdminEmployeesDashboard from "./pages/AdminComponents/EmployeeComponents/Dashboard";
import AdminUserAccountDashboard from "./pages/AdminComponents/UserComponents/Dashboard";
import AdminCreateUserAccountForm from "./pages/AdminComponents/UserComponents/CreateUserComponents/CreateUserForm";
import AdminUpdateUserAccountForm from "./pages/AdminComponents/UserComponents/UpdateUserComponents/UpdateUserForm";
import AdminCreateEmployeeForm from "./pages/AdminComponents/EmployeeComponents/CreateEmployeeComponents/CreateEmployeeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* User Side */}
        <Route path="/Dashboard" element={<HomeDashboard />} />
        <Route path="/Payroll" element={<PayrollDashboard />} />
        <Route path="/Employees" element={<EmployeeDashboard />} />
        <Route path="/Settings" element={<SettingsPage />} />

        <Route path="/Payroll/CreatePayroll" element={<CreatePayrollForm />} />
        <Route path="/UpdatePayroll/:id" element={<UpdatePayrollForm />} />

        <Route path="/Employees/AddEmployee" element={<CreateEmployeeForm />} />
        <Route
          path="/Employees/UpdateEmployee/:id"
          element={<UpdateEmployeeForm />}
        />

        {/* Admin Side */}
        <Route path="/admin-payroll" element={<AdminPayrollDashboard />} />
        <Route
          path="/admin-user-accounts"
          element={<AdminUserAccountDashboard />}
        />
        <Route
          path="/admin-user-accounts/admin-create-user-accounts"
          element={<AdminCreateUserAccountForm />}
        />
        <Route
          path="/admin-user-accounts/admin-update-user-accounts/:id"
          element={<AdminUpdateUserAccountForm />}
        />

        <Route path="/admin-employees" element={<AdminEmployeesDashboard />} />
        <Route path="/admin-employees/create-employees" element={<AdminCreateEmployeeForm />} />

      </Routes>
    </Router>
  );
}

export default App;
