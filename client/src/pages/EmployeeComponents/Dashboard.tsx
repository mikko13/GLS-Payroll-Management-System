import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../SidebarComponents/Sidebar";
import Header from "../HeaderComponents/Header";
import EmployeeStats from "./Stats";
import EmployeeActions from "./Actions";
import EmployeeTable from "./Table";

const EmployeeDashboard = () => {
  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Employees");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/employees");
        const employeesWithId = response.data.map((employee) => ({
          ...employee,
          id: employee._id,
        }));
        setEmployees(employeesWithId);
        setFilteredEmployees(employeesWithId);
        setError(null);

        // Add delay before showing the page with animation
        setTimeout(() => {
          setIsPageLoaded(true);
        }, 100);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();

    // Add the slide down animation style
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

  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(
    (emp) => emp.remarks === "Active"
  ).length;
  const regularEmployees = employees.filter(
    (emp) => emp.status === "Regular"
  ).length;

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-blue-50">
        <div className="text-blue-800 text-lg animate-pulse">Loading...</div>
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
          {error && (
            <div className="p-4 m-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <EmployeeStats
            totalEmployees={totalEmployees}
            activeEmployees={activeEmployees}
            regularEmployees={regularEmployees}
          />

          <EmployeeActions
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            displayedEmployees={displayedEmployees}
            employees={employees}
            setFilteredEmployees={setFilteredEmployees}
          />

          <EmployeeTable
            displayedEmployees={displayedEmployees}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            filteredEmployees={filteredEmployees}
            employees={employees}
            setEmployees={setEmployees}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
