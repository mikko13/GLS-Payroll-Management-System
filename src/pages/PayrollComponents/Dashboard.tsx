/* eslint-disable no-empty-pattern */
import { useState } from "react";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "../HeaderComponents/Header";
import PayPeriod from "./PayPeriod";
import Metrics from "./Metrics";
import ActionsComponent from "./ActionsComponent";
import EmployeeTable from "./Table";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const PayrollDashboardComponent = () => {
  const [employees, setEmployees] = useState([
    {
      id: "1",
      name: "Wek",
      numberOfRegularHours: 160,
      hourlyRate: 50,
      totalRegularWage: 8000,
      regularNightDifferential: 500,
      prorated13thMonthPay: 1000,
      specialHoliday: 200,
      regularHoliday: 300,
      serviceIncentiveLeave: 400,
      overtime: 1000,
      totalAmount: 11400,
      hdmfLoans: 500,
      sss: 800,
      phic: 400,
      netPay: 9700,
      status: "processed",
      checked: false,
    },
    {
      id: "2",
      name: "John",
      numberOfRegularHours: 160,
      hourlyRate: 50,
      totalRegularWage: 8000,
      regularNightDifferential: 500,
      prorated13thMonthPay: 1000,
      specialHoliday: 200,
      regularHoliday: 300,
      serviceIncentiveLeave: 400,
      overtime: 1000,
      totalAmount: 11400,
      hdmfLoans: 500,
      sss: 800,
      phic: 400,
      netPay: 9700,
      status: "processed",
      checked: false,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [] = useState<string | null>("Current Period");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [payPeriod, setPayPeriod] = useState("February 1-15, 2025");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Payroll");
  const handleCheckboxChange = (id: string) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id
          ? { ...employee, checked: !employee.checked }
          : employee
      )
    );
  };

  const getStatusColor = (status: unknown) => {
    switch (status) {
      case "processed":
        return "bg-emerald-100 text-emerald-600";
      case "pending":
        return "bg-amber-100 text-amber-600";
      case "hold":
        return "bg-purple-100 text-purple-600";
      case "error":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: unknown) => {
    switch (status) {
      case "processed":
        return <CheckCircle size={14} className="mr-1" />;
      case "pending":
        return <Clock size={14} className="mr-1" />;
      case "hold":
      case "error":
        return <AlertCircle size={14} className="mr-1" />;
      default:
        return <span />;
    }
  };

  const totalNetPay = employees.reduce((sum, emp) => sum + emp.netPay, 0);
  const totalRegularWage = employees.reduce(
    (sum, emp) => sum + emp.totalRegularWage,
    0
  );
  const totalOvertime = employees.reduce((sum, emp) => sum + emp.overtime, 0);

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
          <EmployeeTable
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
