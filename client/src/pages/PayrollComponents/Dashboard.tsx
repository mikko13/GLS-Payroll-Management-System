import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "../HeaderComponents/Header";
import PayPeriod from "./PayPeriod";
import Metrics from "./Metrics";
import ActionsComponent from "./Actions";
import PayrollTable from "./Table";
import { CheckCircle, Clock } from "lucide-react";

const PayrollDashboardComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [payPeriod, setPayPeriod] = useState("February 1-15, 2025");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Payroll");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payrolls");
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching payrolls:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchPayrolls();
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

  // Compute totals
  const totalNetPay = employees.reduce(
    (sum, emp) => sum + (emp.netPay || 0),
    0
  );
  const totalRegularWage = employees.reduce(
    (sum, emp) => sum + (emp.totalRegularWage || 0),
    0
  );
  const totalOvertime = employees.reduce(
    (sum, emp) => sum + (emp.overtime || 0),
    0
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading payrolls</div>;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
            totalOvertime={totalOvertime}
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

export default PayrollDashboardComponent;
