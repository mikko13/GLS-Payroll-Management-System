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
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
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

          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
