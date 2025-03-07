import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "../HeaderComponents/Header";
import PayPeriod from "./PayPeriod";
import Metrics from "./Metrics";
import ActionsComponent from "./Actions";
import PayrollTable from "./Table";
import { CheckCircle, Clock } from "lucide-react";

const PayrollDashboard: React.FC = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [payPeriod, setPayPeriod] = useState("February 1-15, 2025");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Payroll");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payrolls");
        setEmployees(response.data);
        setLoading(false);

        setTimeout(() => {
          setIsPageLoaded(true);
        }, 100);
      } catch (err) {
        console.error("Error fetching payrolls:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchPayrolls();

    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleCheckboxChange = (id) => {
    setEmployees(
      employees.map((employee) =>
        employee._id === id
          ? { ...employee, checked: !employee.checked }
          : employee
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processed":
        return "bg-emerald-100 text-emerald-600";
      case "Pending":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processed":
        return <CheckCircle size={14} className="mr-1" />;
      case "Pending":
        return <Clock size={14} className="mr-1" />;
      default:
        return <span />;
    }
  };

  const totalNetPay = employees.reduce(
    (sum, emp) => sum + (emp.netPay || 0),
    0
  );
  const totalRegularWage = employees.reduce(
    (sum, emp) => sum + (emp.totalRegularWage || 0),
    0
  );
  const totalProcessedPayroll = employees
    .filter((emp) => emp.status === "Processed")
    .reduce((sum, emp) => sum + (emp.netPay || 0), 0);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-blue-50">
        <div className="text-blue-800 text-lg animate-pulse">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-red-50">
        <div className="text-red-800 text-lg">Error loading payrolls</div>
      </div>
    );

  return (
    <div
      className="flex h-screen w-screen overflow-hidden transition-opacity duration-500"
      style={{ opacity: isPageLoaded ? 1 : 0 }}
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeSidebarItem={activeSidebarItem}
        setActiveSidebarItem={setActiveSidebarItem}
        setSidebarOpen={setSidebarOpen}
      />

      <div
        className="flex-1 flex flex-col h-screen overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f8fafc, #f0f4f8)" }}
      >
        <Header />

        <div className="flex-1 overflow-y-auto">
          <PayPeriod payPeriod={payPeriod} setPayPeriod={setPayPeriod} />
          <Metrics
            totalNetPay={totalNetPay}
            totalRegularWage={totalRegularWage}
            totalProcessedPayroll={totalProcessedPayroll}
          />
          <ActionsComponent employees={employees} />
          <PayrollTable
            employees={employees}
            handleCheckboxChange={handleCheckboxChange}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default PayrollDashboard;
